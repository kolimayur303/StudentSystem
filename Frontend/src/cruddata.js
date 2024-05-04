import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cruddata() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 100;
  const navigate = useNavigate();

  const loadContent = async (id) => {
    if (window.confirm("Do you want to Edit")) {
      try {
        const response = await fetch(`http://localhost:3001/students/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        navigate(`/studdata/${id}`);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
  };

  const deleteContent = async (id) => {
    if (window.confirm("Do you want to delete")) {
      try {
        const response = await fetch(`http://localhost:3001/students/${id}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        setStudents(students.filter(student => student.id !== id));
        alert('Record Deleted');
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/students?page=${currentPage}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data.students);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className='row'>
        <div className='container'>
          <div className='card'>
            <div className='card-title'>
              <h2>Students Management System</h2>
            </div>
            <div className='card-body'>
              <Link to="/studadd" className='btn btn-success mb-3'>Add New</Link>
              <table className='table table-bordered'>
                <thead className='bg-primary text-white'>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>DOB</th>
                    <th>Marks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.age}</td>
                      <td>{item.date_of_birth}</td>
                      <td>{item.marks}</td>
                      <td>
                        <button onClick={() => loadContent(item.id)} className='btn btn-dark m-1'>Edit</button>
                        <button onClick={() => deleteContent(item.id)} className='btn btn-danger'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
          <p>Page {currentPage} of {totalPages}</p>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Studedit() {
  const { studid } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("studid:", studid);
    if (studid) {
      fetch(`http://localhost:3001/students/${studid}`)
        .then((res) => {
          console.log("responce browser :",res)
          if (!res.ok) {
            throw new Error('Failed to fetch student');
          }
          return res.json();
        })
        .then((res) => {
          setName(res.name);
          setEmail(res.email);
          setAge(res.age);
          setDob(res.dob);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("studid is undefined");
    }
  }, [studid]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const studData = { name, email, age, dob };

    fetch(`http://localhost:3001/students/${studid}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(studData)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to update record');
      }
      alert('Record updated');
      navigate('/');
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <div>
      <div className='row'>
        <div className='container'>
          <div className='card'>
            <div className='card-title'>
              <h2>Student Management System</h2>
            </div>
            <div className='card-body'>
              <div className='offset-lg-3 col-lg-6'>
                <form onSubmit={handleSubmit}>
                  <div className='row' style={{ 'textAlign': 'left' }}>
                    <div className='container'>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label>Email</label>
                          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' required />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label>Name</label>
                          <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='form-control' required />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label>Age</label>
                          <input type='number' value={age} onChange={(e) => setAge(e.target.value)} className='form-control' required />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label>DOB</label>
                          <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} className='form-control' required />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='form-group' style={{ 'textAlign': 'center' }}>
                          <button type='submit' className='btn btn-success m-2'>Submit</button>
                          <Link to="/" className='btn btn-danger'>Back</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

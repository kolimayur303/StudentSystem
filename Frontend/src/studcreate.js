import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Studcreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const studData = { name, email, age, dob };

    fetch('http://localhost:3001/students', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(studData)
    })
    .then(() => {
      alert('Record inserted');
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
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
                          <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='form-control' required></input>
                        </div>
                        <div className='form-group'>
                          <label>Name</label>
                          <input type='name' value={name} onChange={e => setName(e.target.value)} className='form-control' required></input>
                        </div>
                        <div className='form-group'>
                          <label>Age</label>
                          <input type='age' value={age} onChange={e => setAge(e.target.value)} className='form-control' required></input>
                        </div>
                        <div className='form-group'>
                          <label>DOB</label>
                          <input type='dob' value={dob} onChange={e => setDob(e.target.value)} className='form-control' required></input>
                        </div>
                      </div>
                      {/* Other input fields */}
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

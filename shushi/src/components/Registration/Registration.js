// frontend/src/components/Registration/Registration.js
import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('test');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Registration;

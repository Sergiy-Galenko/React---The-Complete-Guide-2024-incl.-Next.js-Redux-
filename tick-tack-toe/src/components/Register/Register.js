import React, { useState } from 'react';
import './Register.css';

const Register = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccess(true);
      setMessage('Registration successful');
    } else {
      setSuccess(false);
      setMessage(data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <p className={success ? 'success-message' : 'error-message'}>{message}</p>
        <div className="switch-form">
          <button type="button" onClick={switchToLogin}>
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

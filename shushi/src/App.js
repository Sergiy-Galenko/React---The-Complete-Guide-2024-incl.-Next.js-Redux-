import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Welcome from './components/Welcome/Welcome';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Router>
      <div className="App">
        <div className="button-container">
          <button className="toggle-btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="toggle-btn" onClick={() => setShowLogin(false)}>Register</button>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={showLogin ? <Login /> : <Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

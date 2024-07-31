import React, { useState } from 'react';
import Game from './components/Game';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [isRegister, setIsRegister] = useState(true);

  const switchToLogin = () => setIsRegister(false);
  const switchToRegister = () => setIsRegister(true);

  if (!token) {
    return (
      <div className="App">
        {isRegister ? (
          <Register switchToLogin={switchToLogin} />
        ) : (
          <Login setToken={setToken} switchToRegister={switchToRegister} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;

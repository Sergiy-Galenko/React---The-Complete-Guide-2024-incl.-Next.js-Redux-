import React, { useState } from 'react';
import Game from './components/Game/Game';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CreateRoom from './components/CreateRoom/CreateRoom';
import JoinRoom from './components/JoinRoom/JoinRoom';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(true);
  const [roomId, setRoomId] = useState('');

  const switchToLogin = () => setIsRegister(false);
  const switchToRegister = () => setIsRegister(true);

  const handleLoginSuccess = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  if (!token) {
    return (
      <div className="App">
        {isRegister ? (
          <Register switchToLogin={switchToLogin} />
        ) : (
          <Login setToken={handleLoginSuccess} switchToRegister={switchToRegister} />
        )}
      </div>
    );
  }

  if (!roomId) {
    return (
      <div className="App">
        <CreateRoom setRoomId={setRoomId} />
        <JoinRoom setRoomId={setRoomId} />
      </div>
    );
  }

  return (
    <div className="App">
      <Game roomId={roomId} username={username} />
    </div>
  );
}

export default App;

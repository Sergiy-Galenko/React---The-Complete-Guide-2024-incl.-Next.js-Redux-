import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game/Game';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CreateRoom from './components/CreateRoom/CreateRoom';
import JoinRoom from './components/JoinRoom/JoinRoom';
import Header from './components/Header/Header';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(true);
  const [view, setView] = useState(''); // Додано для управління панелями

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

  return (
    <Router>
      <div className="App">
        <Header setView={setView} />
        <Routes>
          <Route path="/game/:roomId" element={<Game username={username} />} />
          <Route path="/" element={
            <>
              {view === 'createRoom' && <CreateRoom setRoomId={(id) => console.log(`Room ID: ${id}`)} />}
              {view === 'joinRoom' && <JoinRoom setRoomId={(id) => console.log(`Room ID: ${id}`)} />}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

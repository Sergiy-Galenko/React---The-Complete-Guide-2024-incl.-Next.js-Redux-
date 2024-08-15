import React, { useState } from 'react';
import './JoinRoom.css';
import ConfirmationCard from '../ConfirmationCard/ConfirmationCard';

const JoinRoom = ({ setRoomId }) => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/api/room/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, password, playerName }),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccess(true);
      setMessage('Ви успішно підключилися до кімнати');
      setRoomId(data.roomId);
      window.open(`/game/${data.roomId}`, '_blank');
    } else {
      setSuccess(false);
      setMessage(data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleJoinRoom}>
        <h2>Підключитися до кімнати</h2>
        <div className="form-group">
          <label htmlFor="roomName">Назва кімнати</label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="playerName">Ім'я гравця</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="join-room-button">Підключитися до кімнати</button>
        {success && <ConfirmationCard message={message} onDismiss={() => setSuccess(false)} />}
      </form>
    </div>
  );
};

export default JoinRoom;

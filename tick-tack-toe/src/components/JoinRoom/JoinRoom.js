import React, { useState } from 'react';
import './JoinRoom.css';

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
      setMessage('Joined room successfully');
      setRoomId(data.roomId);  // Set room ID to open the game window
    } else {
      setSuccess(false);
      setMessage(data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleJoinRoom}>
        <h2>Join Room</h2>
        <div>
          <label>Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
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
        <div>
          <label>Player Name:</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <button type="submit">Join Room</button>
        <p className={success ? 'success-message' : 'error-message'}>{message}</p>
      </form>
    </div>
  );
};

export default JoinRoom;

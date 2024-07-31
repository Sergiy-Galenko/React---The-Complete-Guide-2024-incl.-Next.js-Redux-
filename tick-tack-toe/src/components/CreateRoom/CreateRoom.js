import React, { useState } from 'react';
import './CreateRoom.css';

const CreateRoom = ({ setRoomId }) => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/api/room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccess(true);
      setMessage('Room created successfully');
      setRoomId(data.roomId);  // Set room ID to open the game window
    } else {
      setSuccess(false);
      setMessage(data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleCreateRoom}>
        <h2>Create Room</h2>
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
        <button type="submit">Create Room</button>
        <p className={success ? 'success-message' : 'error-message'}>{message}</p>
      </form>
    </div>
  );
};

export default CreateRoom;

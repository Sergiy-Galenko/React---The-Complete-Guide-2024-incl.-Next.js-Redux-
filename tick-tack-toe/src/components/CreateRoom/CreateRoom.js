import React, { useState } from 'react';
import './CreateRoom.css';

const CreateRoom = ({ setRoomId }) => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      alert("Будь ласка, оберіть тарифний план.");
      return;
    }
    const response = await fetch('http://localhost:5001/api/room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, password, selectedPlan }),
    });
    const data = await response.json();
    if (response.ok) {
      setRoomId(data.roomId);
      window.open(`/game/${data.roomId}`, '_blank');
    }
  };

  const plans = [
    { name: 'Starter', price: '$0', description: 'free forever' },
    { name: 'Pro', price: '$10', description: 'per month' },
    { name: 'Business', price: '$20', description: 'per month' },
    { name: 'Enterprise', price: '$50', description: 'per month' },
  ];

  return (
    <div className="create-room-container">
      <h2>Створити кімнату</h2>
      <form onSubmit={handleCreateRoom}>
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
        <div className="pricing-plans">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card ${selectedPlan === plan.name ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <div className="pricing-block-content">
                <p className="pricing-plan">{plan.name}</p>
                <div className="price-value">
                  <p className="price-number">{plan.price}</p>
                  <div id="priceDiscountCent">{plan.description}</div>
                </div>
                <ul className="check-list">
                  <li className="check-list-item">Lorem Ipsum</li>
                  <li className="check-list-item">Lorem Ipsum</li>
                  <li className="check-list-item">Lorem Ipsum</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="create-room-button">Створити кімнату</button>
      </form>
    </div>
  );
};

export default CreateRoom;

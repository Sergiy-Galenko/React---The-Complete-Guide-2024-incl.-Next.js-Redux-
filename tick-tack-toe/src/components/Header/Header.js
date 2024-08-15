import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ setView, setRoomId }) => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const response = await fetch('http://localhost:5001/api/leaderboard');
      const data = await response.json();
      setLeaders(data);
    };

    fetchLeaders();
  }, []);

  return (
    <div className="header">
      <button onClick={() => setView('createRoom')}>Створити кімнату</button>
      <button onClick={() => setView('joinRoom')}>Підключитися до кімнати</button>
      <button onClick={() => setView('leaderboard')}>Список лідерів</button>

      <div className="leaderboard" style={{ display: setView === 'leaderboard' ? 'block' : 'none' }}>
        <h2>Список лідерів</h2>
        <table>
          <thead>
            <tr>
              <th>Нік</th>
              <th>Кількість ігор</th>
              <th>Виграних</th>
              <th>Програшів</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={index}>
                <td>{leader.nick}</td>
                <td>{leader.games}</td>
                <td>{leader.wins}</td>
                <td>{leader.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Header;

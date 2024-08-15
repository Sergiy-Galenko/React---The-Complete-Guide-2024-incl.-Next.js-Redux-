import React, { useState, useEffect } from 'react';
import './Header.css';
import { IoCreateOutline } from "react-icons/io5";
import { GiJoin } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";

const Header = ({ setView }) => {
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
      <button onClick={() => setView('createRoom')} className="header-button">
        <IoCreateOutline className="header-icon" />
        Створити кімнату
      </button>
      <button onClick={() => setView('joinRoom')} className="header-button">
        <GiJoin className="header-icon" />
        Підключитися до кімнати
      </button>
      <button onClick={() => setView('leaderboard')} className="header-button">
        <MdLeaderboard className="header-icon" />
        Список лідерів
      </button>

      {setView === 'leaderboard' && (
        <div className="leaderboard">
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
      )}
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Game.css';

const socket = io('http://localhost:5001');

const Game = ({ roomId, username }) => {
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMove, setCurrentMove] = useState({ row: null, col: null });

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`http://localhost:5001/api/game/${roomId}`);
      const gameData = await response.json();
      setGame(gameData);
    };

    fetchGame();

    socket.emit('join_room', roomId);

    socket.on('game_update', (game) => {
      setGame(game);
      setCurrentMove({ row: null, col: null });
    });

    socket.on('receive_message', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('game_update');
      socket.off('receive_message');
    };
  }, [roomId]);

  const makeMove = (row, col) => {
    if (game.board[row][col] !== '' || game.winner || (currentMove.row !== null && currentMove.col !== null)) return;

    setCurrentMove({ row, col });
  };

  const saveMove = () => {
    if (currentMove.row === null || currentMove.col === null) return;

    if (username === game.turn) {
      socket.emit('make_move', { roomId, row: currentMove.row, col: currentMove.col, turn: game.turn });
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', { roomId, message, username });
      setMessage('');
    }
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {game.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${currentMove.row === rowIndex && currentMove.col === colIndex ? 'selected' : ''}`}
              onClick={() => makeMove(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      {currentMove.row !== null && currentMove.col !== null && (
        <button className="save-move" onClick={saveMove}>Save Move</button>
      )}
      <h2 className={game.winner ? 'winner' : 'turn'}>
        {game.winner ? `Winner: ${game.winner}` : `Next turn: ${game.turn}`}
      </h2>
      <div className="chat-container">
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.username}: </strong>{msg.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Game;

import React, { useState, useEffect } from 'react';

const Game = () => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch('http://localhost:5001/api/game', {
        method: 'POST',
      });
      const newGame = await response.json();
      setGame(newGame);
    };

    fetchGame();
  }, []);

  const makeMove = async (row, col) => {
    if (game.board[row][col] !== '' || game.winner) return;

    const updatedBoard = game.board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? game.turn : c))
    );

    const nextTurn = game.turn === 'X' ? 'O' : 'X';
    const winner = checkWinner(updatedBoard);

    const response = await fetch(`http://localhost:5001/api/game/${game._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board: updatedBoard, turn: nextTurn, winner }),
    });

    const updatedGame = await response.json();
    setGame(updatedGame);
  };

  const checkWinner = (board) => {
    const lines = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of lines) {
      if (line.every((cell) => cell === 'X')) return 'X';
      if (line.every((cell) => cell === 'O')) return 'O';
    }

    return board.flat().every((cell) => cell) ? 'Draw' : '';
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)' }}>
        {game.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid black',
                fontSize: '24px',
              }}
              onClick={() => makeMove(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <h2>{game.winner ? `Winner: ${game.winner}` : `Next turn: ${game.turn}`}</h2>
    </div>
  );
};

export default Game;

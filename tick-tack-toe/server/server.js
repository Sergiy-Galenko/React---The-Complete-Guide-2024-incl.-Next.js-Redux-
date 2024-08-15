const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');

// Створення серверу
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Підключення Middleware
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect('mongodb+srv://sgalenko783:Pas123@tik-tak-toe.ewgkfux.mongodb.net/tik-tak-toe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Схеми Mongoose
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  boardSize: { type: Number, required: true },
  players: { type: Array, default: [] },
});

const gameSchema = new mongoose.Schema({
  board: {
    type: Array,
    default: [],
  },
  turn: {
    type: String,
    default: 'X',
  },
  winner: {
    type: String,
    default: '',
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  boardSize: {
    type: Number,
    required: true,
  },
});

// Моделі Mongoose
const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);
const Game = mongoose.model('Game', gameSchema);

// Роут для реєстрації
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'User registration failed' });
  }
});

// Роут для логіну
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Login failed' });
  }
});

// Роут для створення кімнати
app.post('/api/room', async (req, res) => {
  const { roomName, password, boardSize } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const room = new Room({ roomName, password: hashedPassword, boardSize });
    await room.save();

    // Ініціалізація дошки відповідного розміру
    const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(''));

    const game = new Game({ roomId: room._id, board, boardSize });
    await game.save();
    res.status(201).send({ message: 'Room created successfully', roomId: room._id });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Room creation failed' });
  }
});

// Роут для підключення до кімнати
app.post('/api/room/join', async (req, res) => {
  const { roomName, password, playerName } = req.body;
  try {
    const room = await Room.findOne({ roomName });
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }
    const isMatch = await bcrypt.compare(password, room.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    room.players.push(playerName);
    await room.save();
    res.send({ message: 'Joined room successfully', roomId: room._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Joining room failed' });
  }
});

// Роут для отримання гри за roomId
app.get('/api/game/:roomId', async (req, res) => {
  try {
    const game = await Game.findOne({ roomId: req.params.roomId });
    res.send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch game' });
  }
});

// Роут для отримання списку лідерів
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find().select('username games wins losses -_id');
    const leaderboard = users.map(user => ({
      nick: user.username,
      games: user.games,
      wins: user.wins,
      losses: user.losses
    }));
    res.send(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch leaderboard' });
  }
});

// Роут для оновлення гри
app.put('/api/game/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update game' });
  }
});

// Налаштування Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('make_move', async (data) => {
    const { roomId, row, col, turn } = data;
    const game = await Game.findOne({ roomId });
    if (!game || game.board[row][col] !== '' || game.winner || game.turn !== turn) return;

    game.board[row][col] = turn;
    game.turn = game.turn === 'X' ? 'O' : 'X';
    game.winner = checkWinner(game.board);

    await game.save();

    io.to(roomId).emit('game_update', game);
  });

  socket.on('send_message', (data) => {
    const { roomId, message, username } = data;
    io.to(roomId).emit('receive_message', { message, username });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Функція перевірки переможця
const checkWinner = (board) => {
  const size = board.length;
  const lines = [];

  for (let i = 0; i < size; i++) {
    lines.push(board[i]);  // Перевірка рядків
    lines.push(board.map(row => row[i]));  // Перевірка стовпців
  }

  lines.push(board.map((row, i) => row[i]));  // Перевірка головної діагоналі
  lines.push(board.map((row, i) => row[size - 1 - i]));  // Перевірка побічної діагоналі

  for (const line of lines) {
    if (line.every(cell => cell === 'X')) return 'X';
    if (line.every(cell => cell === 'O')) return 'O';
  }

  return board.flat().every(cell => cell) ? 'Draw' : '';
};

// Запуск серверу
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

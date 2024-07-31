const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sgalenko783:Pass123@tik-tak-toe.ewgkfux.mongodb.net/?retryWrites=true&w=majority&appName=tik-tak-toe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const gameSchema = new mongoose.Schema({
  board: {
    type: Array,
    default: [['', '', ''], ['', '', ''], ['', '', '']],
  },
  turn: { type: String, default: 'X' },
  winner: { type: String, default: '' },
});

const User = mongoose.model('User', userSchema);
const Game = mongoose.model('Game', gameSchema);

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.send({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, 'secretKey');
  res.send({ token });
});

app.post('/api/game', async (req, res) => {
  const newGame = new Game();
  await newGame.save();
  res.send(newGame);
});

app.get('/api/game/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.send(game);
});

app.put('/api/game/:id', async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(game);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
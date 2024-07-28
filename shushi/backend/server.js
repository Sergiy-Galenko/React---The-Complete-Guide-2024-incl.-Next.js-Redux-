const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Order = require('./models/Order');
const Sushi = require('./models/Sushi'); // підключіть модель Sushi

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sgalenko783:Pass123@shushi.s3smedv.mongodb.net/shushi?retryWrites=true&w=majority&appName=shushi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/register', async (req, res) => {
  const { email, password, phone, lastName, city } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword, phone, lastName, city });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/create-order', async (req, res) => {
  const { items, totalPrice, name, address, phone, message } = req.body;
  try {
    const order = new Order({ items, totalPrice, name, address, phone, message });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Маршрут для отримання всіх суші
app.get('/sushi', async (req, res) => {
  try {
    const sushi = await Sushi.find();
    res.json(sushi);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Cart from './components/Cart/Cart';
import OrderForm from './components/OrderForm/OrderForm';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleOrderSubmit = () => {
    setCartItems([]);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home handleAddToCart={handleAddToCart} cartItems={cartItems} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onOrderSubmit={handleOrderSubmit} />} />
        <Route path="/order" element={<OrderForm cartItems={cartItems} totalPrice={cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Cart from './components/Cart/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (sushiItem) => {
    setCart([...cart, sushiItem]);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleOrderSubmit = () => {
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home handleAddToCart={handleAddToCart} cartItems={cart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/cart" element={<Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onOrderSubmit={handleOrderSubmit} />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, onRemoveFromCart, onOrderSubmit }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleOrderSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5001/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cartItems, totalPrice })
      });
      const data = await response.json();
      if (response.status === 201) {
        alert('Замовлення створено успішно');
        onOrderSubmit();
        navigate('/home');
      } else {
        alert('Помилка створення замовлення');
      }
    } catch (error) {
      alert('Помилка створення замовлення');
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="cart-container">
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <h3>{item.title}</h3>
              <p>{item.describe}</p>
              <p>Ціна: {item.price} грн</p>
              <img src={item.img} alt={item.title} />
              <button onClick={() => onRemoveFromCart(index)} className="remove-from-cart-btn">Видалити</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <h3>Загальна сума: {totalPrice} грн</h3>
        <button onClick={handleOrderSubmit} className="submit-order-btn">Сформувати замовлення</button>
      </div>
      <button onClick={handleBackToHome} className="back-to-home-btn">Повернутися на головну</button>
    </div>
  );
};

export default Cart;

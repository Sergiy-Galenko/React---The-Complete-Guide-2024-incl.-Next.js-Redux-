import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ cartItems, totalPrice }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity || 1));

  const handleQuantityChange = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map((item, index) => ({ ...item, quantity: quantities[index] })),
          totalPrice,
          name,
          address,
          phone,
          message,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert('Замовлення створено успішно');
        // Handle post-order logic
      } else {
        alert('Помилка створення замовлення');
      }
    } catch (error) {
      alert('Помилка створення замовлення');
    }
  };

  return (
    <div className="order-form-container">
      <h2>Форма замовлення</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ім'я:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Телефон:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Адреса доставки:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {/* Add Google Maps integration here if needed */}
        </div>
        {cartItems.map((item, index) => (
          <div key={item._id} className="form-group">
            <label>{item.title} - Кількість:</label>
            <input
              type="number"
              value={quantities[index]}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              min="1"
              required
            />
          </div>
        ))}
        <div className="form-group">
          <label>Повідомлення для кур'єра:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="submit-order-btn">Сформувати замовлення</button>
      </form>
    </div>
  );
};

export default OrderForm;

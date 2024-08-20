import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  const handleProceedToOrder = () => {
    navigate('/order');
  };

  const handleIncreaseQuantity = (index) => {
    onUpdateQuantity(index, cartItems[index].quantity + 1);
  };

  const handleDecreaseQuantity = (index) => {
    if (cartItems[index].quantity > 1) {
      onUpdateQuantity(index, cartItems[index].quantity - 1);
    }
  };

  return (
    <div className="master-container">
      <div className="card cart">
        <label className="title">Ваш кошик</label>
        <div className="products">
          {cartItems.length === 0 ? (
            <p>Ваш кошик порожній</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="product" key={index}>
                <img src={item.img} alt={item.title} width="60" height="60" />
                <div>
                  <span>{item.title}</span>
                  <p>{item.describe}</p>
                </div>
                <div className="quantity">
                  <button onClick={() => handleDecreaseQuantity(index)}>
                    <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                    </svg>
                  </button>
                  <label>{item.quantity}</label>
                  <button onClick={() => handleIncreaseQuantity(index)}>
                    <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                    </svg>
                  </button>
                </div>
                <label className="price small">{item.price * item.quantity} грн</label>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card checkout">
        <label className="title">Замовлення</label>
        <div className="details">
          <span>Загальна сума:</span>
          <span>{totalPrice} грн</span>
        </div>
        <div className="checkout--footer">
          <label className="price"><sup>₴</sup>{totalPrice}</label>
          <button className="checkout-btn" onClick={handleProceedToOrder}>Сформувати замовлення</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

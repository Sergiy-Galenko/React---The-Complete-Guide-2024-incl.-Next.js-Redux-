import React from 'react';
import './Header.css';

const UserActions = ({ cartItems, navigate }) => {
  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="home-actions">
      <span onClick={handleCartClick} className="cart-icon" style={{ cursor: 'pointer' }}>
        🛒 {cartItems ? cartItems.length : 0}
      </span>
    </div>
  );
};

export default UserActions;

import React from 'react';
import './Home.css';

const SushiList = ({ sushi, handleAddToCartClick }) => {
  return (
    <div className="sushi-list">
      {sushi.length > 0 ? (
        sushi.map((item) => (
          <div key={item._id} className="sushi-item">
            <h3>{item.title}</h3>
            <p>{item.describe}</p>
            <p>Ціна: {item.price} грн</p>
            <img src={item.img} alt={item.title} />
            <p>Тип: {item.type}</p>
            <button onClick={() => handleAddToCartClick(item)} className="add-to-cart-btn">Додати в кошик</button>
          </div>
        ))
      ) : (
        <div className="no-sushi-item">Суші не знайдено</div>
      )}
    </div>
  );
};

export default SushiList;

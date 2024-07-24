import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ handleAddToCart, cartItems }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Київ');
  const [searchQuery, setSearchQuery] = useState('');
  const [sushi, setSushi] = useState([]);
  const navigate = useNavigate();
  const cities = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Запоріжжя', 'Вінниця', 'Івано-Франківськ', 'Тернопіль', 'Полтава'];

  useEffect(() => {
    fetch('http://localhost:5001/sushi')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched sushi data:', data);
        setSushi(data);
      })
      .catch((error) => console.error('Error fetching sushi:', error));
  }, []);

  const handleCityClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    setShowDropdown(false);
  };

  const handleAddToCartClick = (sushiItem) => {
    handleAddToCart({ ...sushiItem, quantity: 1 }); // Додаємо quantity
    toast.success(`${sushiItem.title} додано до кошика`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-top-bar">
          <div className="home-location" onClick={handleCityClick}>
            <span>{selectedCity}</span>
            <span className="language">UA</span>
          </div>
          <div className="home-contact">
            <span>0 800 330 333</span>
          </div>
        </div>
        <nav className="home-nav">
          <img src={logo} alt="Sushi Master UA" className="home-logo" />
          <ul className="home-menu">
            <li>Сети</li>
            <li>Роли</li>
            <li>Комбо</li>
            <li>🔥Акції</li>
            <li>⭐Новинки</li>
            <li>Суші</li>
            <li>Гаряче та салати</li>
            <li>Десерти</li>
            <li>Напої</li>
            <li>Доповнення</li>
          </ul>
          <div className="home-actions">
            <span>🔍</span>
            <span>Увійти</span>
            <span onClick={handleCartClick} style={{ cursor: 'pointer' }}>
              🛒 {cartItems.length}
            </span>
          </div>
        </nav>
      </header>
      {showDropdown && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="modal">
            <div className="modal-header">
              <h2>Ваше місто</h2>
              <span className="close-btn" onClick={handleClose}>&times;</span>
            </div>
            <input
              type="text"
              placeholder="Введіть назву міста"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="city-list">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city}
                    className="city-item"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))
              ) : (
                <div className="no-city-item">Такого міста немає</div>
              )}
            </div>
          </div>
        </div>
      )}
      <Slider {...sliderSettings} className="home-slider">
        <div>
          <img src="https://via.placeholder.com/800x300?text=Слайд+1" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x300?text=Слайд+2" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x300?text=Слайд+3" alt="Slide 3" />
        </div>
      </Slider>
      <div className="delivery-text">
        <h2>Доставка суші {selectedCity}</h2>
      </div>
      <div className="sushi-list">
        {sushi.map((item) => (
          <div key={item._id} className="sushi-item">
            <h3>{item.title}</h3>
            <p>{item.describe}</p>
            <p>Ціна: {item.price} грн</p>
            <img src={item.img} alt={item.title} />
            <p>Тип: {item.type}</p>
            <button onClick={() => handleAddToCartClick(item)} className="add-to-cart-btn">Додати в кошик</button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;

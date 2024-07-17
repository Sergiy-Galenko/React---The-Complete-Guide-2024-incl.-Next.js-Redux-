import React, { useState } from 'react';
import './Home.css';
import logo from '../../assets/logo.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Київ');
  const [searchQuery, setSearchQuery] = useState('');
  const cities = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Запоріжжя', 'Вінниця', 'Івано-Франківськ', 'Тернопіль', 'Полтава'];

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
            <span>🛒</span>
          </div>
        </nav>
      </header>
      {showDropdown && (
        <div className="modal-overlay">
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
    </div>
  );
};

export default Home;

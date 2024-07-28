import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ handleAddToCart, cartItems = [] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Київ');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [sushi, setSushi] = useState([]);
  const [user, setUser] = useState({ firstName: 'Користувач' });
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

    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleCityClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const results = sushi.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.describe.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchIconClick = () => {
    setShowSearchModal(true);
  };

  const handleSearchModalClose = () => {
    setShowSearchModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    setShowDropdown(false);
  };

  const handleAddToCartClick = (sushiItem) => {
    handleAddToCart({ ...sushiItem, quantity: 1 });
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
        </div>
        <nav className="home-nav">
          <img src={logo} alt="Sushi Master UA" className="home-logo" />
          <ul className="home-menu">
            <li>Сети</li>
            <li>Роли</li>
            <li>Комбо</li>
            <li>🔥Акції</li>
            <li>Суші</li>
            <li>Гаряче та салати</li>
            <li>Десерти</li>
            <li>Напої</li>
            <span onClick={handleCartClick} style={{ cursor: 'pointer' }}>
              🛒 {cartItems.length}
            </span>
          </ul>
          <div className="home-actions">
            <span></span>
            <span></span>
            <span></span>
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
      {showSearchModal && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="modal">
            <div className="modal-header">
              <h2>Пошук суші</h2>
              <span className="close-btn" onClick={handleSearchModalClose}>&times;</span>
            </div>
            <input
              type="text"
              placeholder="Введіть назву суші"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="sushi-list">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
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
                <div className="no-sushi-item">Нічого не знайдено</div>
              )}
            </div>
          </div>
        </div>
      )}
      <Slider {...sliderSettings} className="home-slider">
        <div>
          <img src="https://cdn.sushi-master.ua/sm-ua/promotions/0004-zustrichajte-garyachi-novinki-sushi-burgeri-ta-rol-dogi-web-ru.jpeg?alt=media&token=b90ed098-2131-4185-ae25-b24c07f6c828}&w=1280&h=500&format=auto&mode=fit&q=60" alt="Slide 1" />
        </div>
        <div>
          <img src="https://cdn.sushi-master.ua/sm-ua/promotions/0001-sm-moti-web-ru.png?alt=media&token=7259d763-6b08-4729-b30a-8e9cbe725cb3}&w=1280&h=500&format=auto&mode=fit&q=60" alt="Slide 2" />
        </div>
        <div>
          <img src="https://cdn.sushi-master.ua/sm-ua/promotions/0002-bonusna-programa-sushi-master-2023-web-ru.png?alt=media&token=10594c1f-bb9f-416a-bf02-1f162708a541}&w=1280&h=500&format=auto&mode=fit&q=60" alt="Slide 3" />
        </div>
      </Slider>
      <div className="delivery-text">
        <h2>Доставка суші {selectedCity}</h2>
      </div>
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
      <ToastContainer />
    </div>
  );
};

export default Home;

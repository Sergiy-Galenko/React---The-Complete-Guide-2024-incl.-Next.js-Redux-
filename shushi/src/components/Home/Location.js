import React, { useState } from 'react';
import './Header.css';

const Location = ({ selectedCity, setSelectedCity }) => {
  const [showDropdown, setShowDropdown] = useState(false);
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

  return (
    <div className="home-location" onClick={handleCityClick}>
      <span>{selectedCity}</span>
      <span className="language">UA</span>
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
    </div>
  );
};

export default Location;

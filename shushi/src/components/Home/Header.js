import React from 'react';
import Location from './Location';
import Menu from './Menu';
import UserActions from './UserActions';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = ({ selectedCity, setSelectedCity, cartItems, navigate }) => {
  return (
    <header className="home-header">
      <div className="home-top-bar">
        <Location selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      </div>
      <nav className="home-nav">
        <img src={logo} alt="Sushi Master UA" className="home-logo" />
        <Menu />
        <UserActions cartItems={cartItems} navigate={navigate} />
      </nav>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from './Header';
import SliderComponent from './Slider';
import SushiList from './SushiList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ handleAddToCart, cartItems }) => {
  const [sushi, setSushi] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Київ');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/sushi')
      .then(response => response.json())
      .then(data => setSushi(data))
      .catch(error => console.error('Error fetching sushi:', error));
  }, []);

  const handleAddToCartClick = (sushiItem) => {
    handleAddToCart({ ...sushiItem, quantity: 1 });
    toast.success(`${sushiItem.title} додано до кошика`);
  };

  return (
    <div className="home-container">
      <Header 
        selectedCity={selectedCity} 
        setSelectedCity={setSelectedCity} 
        cartItems={cartItems} 
        navigate={navigate} 
      />
      <SliderComponent />
      <SushiList sushi={sushi} handleAddToCartClick={handleAddToCartClick} />
      <ToastContainer />
    </div>
  );
};

export default Home;

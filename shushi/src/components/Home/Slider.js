import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const SliderComponent = () => {
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
        <Slider {...sliderSettings} className="home-slider">
            <div>
                <img
                    src="https://cdn.sushi-master.ua/sm-ua/promotions/0004-zustrichajte-garyachi-novinki-sushi-burgeri-ta-rol-dogi-web-ru.jpeg?alt=media&token=b90ed098-2131-4185-ae25-b24c07f6c828}&w=1280&h=500&format=auto&mode=fit&q=60"
                    alt="Slide 1"
                />
            </div>
            <div>
                <img
                    src="https://cdn.sushi-master.ua/sm-ua/promotions/0001-sm-moti-web-ru.png?alt=media&token=7259d763-6b08-4729-b30a-8e9cbe725cb3}&w=1280&h=500&format=auto&mode=fit&q=60"
                    alt="Slide 2"
                />
            </div>
            <div>
                <img
                    src="https://cdn.sushi-master.ua/sm-ua/promotions/0002-bonusna-programa-sushi-master-2023-web-ru.png?alt=media&token=10594c1f-bb9f-416a-bf02-1f162708a541}&w=1280&h=500&format=auto&mode=fit&q=60"
                    alt="Slide 3"
                />
            </div>
        </Slider>
    );
};

export default SliderComponent;

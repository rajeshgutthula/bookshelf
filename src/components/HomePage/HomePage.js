import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Header from "../Header/Header";
// import logo from "../../images/Homelogo1.png"; // if needed
import "./HomePage.css";

const HomePage = () => {
    const [apidata, setApidata] = useState({ books: [], total: 0 });
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        cookies.remove('jwt_token');
        navigate('/Login');
    }, [navigate]);

    const fetchData = useCallback(async () => { 
        const jwtToken = cookies.get('jwt_token');
        if (jwtToken === undefined) {
            handleLogout();
            return;
        }

        const response = await fetch("https://apis.ccbp.in/book-hub/top-rated-books", {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            handleLogout();
            return;
        }

        const json = await response.json();
        setApidata(json);
    }, [handleLogout]);

    useEffect(() => {
        const jwtToken = cookies.get('jwt_token');
        if (jwtToken === undefined) {
            navigate('/Login');
        } else {
            fetchData();
        }
    }, [fetchData, navigate]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    // Handler for Find Books button
    const handleFindBooks = () => {
        navigate('/Bookshelves', { state: { fromHome: true } });
    };

    return (
        <div className="main-div">
            <Header />
            <h5 className="home-text">Find Your Next Favorite Books?</h5>
            <p className="paragraph-content">
                You are in the right place. Tell us what titles or genres you have enjoyed in the past, 
                and we will give you surprisingly insightful recommendations.
            </p>
            <div className="top-rated-div">
                <div className="top-rated-books">
                    <p className="top-rated-styles">Top Rated Books</p>
                    <button className="find-butn" onClick={handleFindBooks}>Find Books</button>
                </div>
                <div className="slider-container Carousel-div">
                    <Slider {...settings}>
                        {apidata.books.map((slider) => (
                            <div key={slider.id}>
                                <img className="imagebox" src={slider.cover_pic} alt="NoImage" />
                                <div className="caption"><h6>{slider.title}</h6></div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="footer-icons">
                <FontAwesomeIcon icon={faGoogle} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faYoutube} />
            </div>
            <div className="footer">
                <p>Contact Us</p>
            </div>
        </div>
    );
};

export default HomePage;

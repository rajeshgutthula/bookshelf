import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faStar } from '@fortawesome/free-solid-svg-icons';

const BookCard=(props)=>{
    const navigate = useNavigate();
    const{cardData}=props;

    const handleClick=()=>{
        navigate(`/BookDetail/${cardData.id}`);
    }

      return(
          <div onClick={handleClick} className="cards-main-container">
              <div className="card-Div">
                  <img className="card-image" src={cardData.cover_pic} alt="No_image"/>
                  <div className="books-details-div">
                      <h6 className="font-for-all heading">{cardData.title}</h6>
                      <p className="font-for-all descrition">{cardData.author_name}</p>
                      <div className="rating-div">
                          <p className="font-for-all">Avg Rating:<FontAwesomeIcon className="stars" icon={faStar}/></p>
                          <p className="font-for-all">{cardData.rating}</p>
                      </div>
                      <p className="font-for-all">Status:<a className="font-for-all font-size" href="#0">{cardData.read_status}</a></p>
                  </div>
              </div>
          </div>
      )
  }

export default BookCard;
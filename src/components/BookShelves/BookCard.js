import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
    const { cardData, onBookmarkToggle, isWantToRead } = props;
    const navigate = useNavigate();

    const handleBookmarkClick = (event) => {
        event.stopPropagation();
        onBookmarkToggle(cardData.id);
    };

    const handleCardClick = () => {
        navigate(`/BookDetail/${cardData.id}`);
    };

    return (
        <div className="cards-main-container" onClick={handleCardClick}>
            <div className="card-Div">
                <FontAwesomeIcon
                    icon={faBookmark}
                    className={`bookmark-icon ${isWantToRead ? 'active' : ''}`}
                    onClick={handleBookmarkClick}
                />
                <img className="card-image" src={cardData.cover_pic} alt="No_image" />
                <div className="books-details-div">
                    <h6 className="font-for-all heading">{cardData.title}</h6>
                    <p className="font-for-all descrition">{cardData.author_name}</p>
                    <div className="rating-div">
                        <p className="font-for-all">Avg Rating:</p>
                        <p className="font-for-all">
                            <FontAwesomeIcon className="stars" icon={faStar} />
                            {cardData.rating}
                        </p>
                    </div>
                    <p className="font-for-all">
                        Status: <a className="font-for-all font-size" href="#0">{cardData.read_status}</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookCard;

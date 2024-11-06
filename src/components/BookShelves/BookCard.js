import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
    const { cardData, onBookmarkToggle, isWantToRead } = props;
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleBookmarkClick = () => {
        onBookmarkToggle(cardData.id); // Toggle the "Want to Read" status
    };

    // Navigate to the Book Details page when the card is clicked
    const handleCardClick = () => {
        navigate(`/BookDetail/${cardData.id}`); // Redirect to the Book Details page using the book ID
    };

    return (
        <div className="cards-main-container" onClick={handleCardClick}> {/* Add onClick to navigate on card click */}
            <div className="card-Div">
                <FontAwesomeIcon
                    icon={faBookmark}
                    className={`bookmark-icon ${isWantToRead ? 'active' : ''}`}
                    onClick={handleBookmarkClick} // Toggle when clicked
                />
                <img className="card-image" src={cardData.cover_pic} alt="No_image" />
                <div className="books-details-div">
                    <h6 className="font-for-all heading">{cardData.title}</h6>
                    <p className="font-for-all descrition">{cardData.author_name}</p>
                    <div className="rating-div">
                        <p className="font-for-all">Avg Rating: <FontAwesomeIcon className="stars" icon={faStar} /></p>
                        <p className="font-for-all">{cardData.rating}</p>
                    </div>
                    <p className="font-for-all">Status: <a className="font-for-all font-size" href="#0">{cardData.read_status}</a></p>
                </div>
            </div>
        </div>
    );
};

export default BookCard;

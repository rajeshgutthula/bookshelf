import './BookDetails.css';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cookies from 'js-cookie';

const BookDetail = () => {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const jwtToken = cookies.get('jwt_token');
                const bookDetailsApi = await fetch(`https://apis.ccbp.in/book-hub/books/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                if (!bookDetailsApi.ok) {
                    throw new Error('Failed to fetch book details');
                }

                const bookDetailsJson = await bookDetailsApi.json();
                setBookDetails(bookDetailsJson.book_details);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="backgrounddiv">
            <Header />
            <div className="card-div-background">
                <div className="cardDiv">
                    <img
                        className="cardImage"
                        src={bookDetails.cover_pic || 'default_image_url'}
                        alt={bookDetails.title || 'No image available'}
                    />
                    <div className="books-detailsDiv">
                        <h6 className="font-forall title">{bookDetails.title || 'No title available'}</h6>
                        <p className="font-forall author-descrition">
                            {bookDetails.author_name || 'No author information'}
                        </p>
                        <div className="ratingDiv">
                            <p className="font-forall">
                                Avg Rating: <FontAwesomeIcon className="staricon" icon={faStar} />
                            </p>
                            <p className="font-forall">{bookDetails.rating || 'N/A'}</p>
                        </div>
                        <p className="font-forall">
                            Status: <a className="font-forall" href="#0">{bookDetails.read_status || 'N/A'}</a>
                        </p>
                    </div>
                </div>
                <hr className="underline" />
                <div className="authorDetails">
                    <h6 className="font-forall title">About Author</h6>
                    <p className="font-forall">{bookDetails.about_author || 'No information available'}</p>
                    <h6 className="font-forall title">About Book</h6>
                    <p className="font-forall">{bookDetails.about_book || 'No information available'}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookDetail;

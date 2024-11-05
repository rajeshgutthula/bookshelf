import './BookDetails.css';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cookies from 'js-cookie';


const BookDetail = () => {
//   const navigate = useNavigate();
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState({books:[]});

    useEffect(()=>{
        const fetchBookDetails = async () => {
            const jwtToken = cookies.get('jwt_token');
            const bookDetailsApi = await fetch(`https://apis.ccbp.in/book-hub/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            const bookDetailsJson = await bookDetailsApi.json();
            setBookDetails(bookDetailsJson.book_details);
        };

        fetchBookDetails();
    }, [id]);

    console.log(bookDetails);

    return(
        <div className="backgrounddiv">
            <Header/>
            <div className="card-div-background">
                <div className="cardDiv">
                    <img className="cardImage" src={bookDetails.cover_pic} alt="No_image"/>
                    <div className="books-detailsDiv">
                        <h6 className="font-forall title">{bookDetails.title}</h6>
                        <p className="font-forall author-descrition">{bookDetails.author_name}</p>
                        <div className="ratingDiv">
                            <p className="font-forall">Avg Rating: <FontAwesomeIcon className="staricon" icon={faStar}/></p>
                            <p className="font-forall">{bookDetails.rating}</p>
                        </div>
                        <p className="font-forall">Status:<a className="font-forall" href="#0">{bookDetails.read_status}</a></p>
                    </div>
                </div>
                <hr className="underline"></hr>
                <div className="authorDetails">
                    <h6 className="font-forall title">About Author</h6>
                    <p className="font-forall">{bookDetails.about_author}</p>
                    <h6 className="font-forall title">About Book</h6>
                    <p className="font-forall">{bookDetails.about_book}</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
        
}

export default BookDetail;
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import cookies from 'js-cookie';
import BookCard from './BookCard';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import Loader from "../Loader/Loader";
import './BookShelves.css';

const Bookshelves = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredBooks, setFilteredBooks] = useState({ books: [], total: 0 });
    const [fetchedBooks, setFetchedBooks] = useState({ books: [], total: 0 });
    const [loading, setLoading] = useState(true);
    const [wantToRead, setWantToRead] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Create a ref for the search input
    const searchInputRef = useRef(null);

    useEffect(() => {
        const savedWantToRead = JSON.parse(localStorage.getItem('wantToRead')) || [];
        setWantToRead(savedWantToRead);
    }, []);

    // Auto-focus the search input if navigated from HomePage
    useEffect(() => {
        if (location.state?.fromHome && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [location.state]);

    const searchEle = (event) => {
        setSearchValue(event.target.value);
    };

    const executeSearch = () => {
        const filtereddata = { 
            books: fetchedBooks.books.filter((value) =>
                value.title.toLowerCase().includes(searchValue.toLowerCase())
            ) 
        };
        if (filtereddata.books.length === 0) {
            navigate('/Home');
        } else {
            setFilteredBooks(filtereddata);
        }
    };

    const fetchBookshelvesData = useCallback(async () => {
        const jwtToken = cookies.get('jwt_token');
        const booksApi = await fetch("https://apis.ccbp.in/book-hub/books?", {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        const booksJson = await booksApi.json();
        setTimeout(() => {
            const updatedBooks = booksJson.books.map(book => ({
                ...book,
                isWantToRead: wantToRead.includes(book.id)
            }));
            setFetchedBooks({ books: updatedBooks, total: booksJson.total });
            setFilteredBooks({ books: updatedBooks, total: booksJson.total });
            setLoading(false); 
        }, 1500); 
    }, [wantToRead]);

    useEffect(() => {
        const jwtToken = cookies.get('jwt_token');
        if (!jwtToken) {
            navigate('/Login');
        } else {
            fetchBookshelvesData();
        }
    }, [fetchBookshelvesData, navigate]);

    const handleBookmarkToggle = (bookId) => {
        const isAlreadyInWantToRead = wantToRead.includes(bookId);
        const updatedWantToRead = isAlreadyInWantToRead
            ? wantToRead.filter(id => id !== bookId)
            : [...wantToRead, bookId];
        localStorage.setItem('wantToRead', JSON.stringify(updatedWantToRead));
        setWantToRead(updatedWantToRead);

        const updatedBooks = fetchedBooks.books.map(book => ({
            ...book,
            isWantToRead: updatedWantToRead.includes(book.id)
        }));
        setFetchedBooks({ books: updatedBooks, total: fetchedBooks.total });
        setFilteredBooks({ books: updatedBooks, total: fetchedBooks.total });
    };

    return (
        <div className="main-divcontainer">
            <Header />
            <div className="second-div">
                <div className="second-main-div">
                    <div className="categories-div">
                        <p className="Bookshelves-head">BookShelves</p>
                        <div className="categorieitems-div">
                            <h6 className="All-elements" onClick={() => setFilteredBooks(fetchedBooks)}>All</h6>
                            <h6 className="headingiteams" onClick={() => {
                                const readingfilter = { books: fetchedBooks.books.filter(item => item.read_status === "Read") };
                                setFilteredBooks(readingfilter);
                            }}>Read</h6>
                            <h6 className="headingiteams" onClick={() => {
                                const readingfilter = { books: fetchedBooks.books.filter(item => item.read_status === "Currently Reading") };
                                setFilteredBooks(readingfilter);
                            }}>Currently Reading</h6>
                            <h6 className="headingiteams" onClick={() => {
                                const wantToReadFilter = { books: fetchedBooks.books.filter(item => wantToRead.includes(item.id)) };
                                setFilteredBooks(wantToReadFilter);
                            }}>Want to Read</h6>
                        </div>
                    </div>
                    <div className="bookscontainer">
                        <div className="search-bar-div">
                            <h6>All Books</h6>
                            <div className="text-div">
                                <input 
                                    ref={searchInputRef} // attach the ref here
                                    onChange={searchEle} 
                                    onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
                                    value={searchValue} 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search books..." 
                                    aria-label="Search books" 
                                    aria-describedby="search-icon" 
                                />
                                <span onClick={executeSearch} className="input-group-text">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                        </div>
                        <div className="dynamic-div">
                            {loading ? <Loader /> :
                                filteredBooks.books.map((bookCard) => (
                                    <BookCard
                                        key={bookCard.id}
                                        cardData={bookCard}
                                        onBookmarkToggle={handleBookmarkToggle}
                                        isWantToRead={wantToRead.includes(bookCard.id)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Bookshelves;

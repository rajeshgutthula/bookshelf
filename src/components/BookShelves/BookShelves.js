import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './BookShelves.css';
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import BookCard from './BookCard';
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import Loader from "../Loader/Loader";

const Bookshelves = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState({ books: [], total: 0 });
  const [fetchedBooks, setFetchedBooks] = useState({ books: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const searchEle = (event) => {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    const jwtToken = cookies.get('jwt_token');
    if (jwtToken === undefined) {
      navigate('/Login');
    } else {
      fetchBookshelvesData();
    }
  }, [navigate]);

  const fetchBookshelvesData = async () => {
    const jwtToken = cookies.get('jwt_token');
    const booksApi = await fetch("https://apis.ccbp.in/book-hub/books?", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const booksJson = await booksApi.json();
    setTimeout(() => {
      setFetchedBooks(booksJson);
      setFilteredBooks(booksJson);
      setLoading(false); 
    }, 1500); 
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
                const readingfilter = { books: fetchedBooks.books.filter((item) => item.read_status === "Read") };
                setFilteredBooks(readingfilter);
              }}>Read</h6>
              <h6 className="headingiteams" onClick={() => {
                const readingfilter = { books: fetchedBooks.books.filter((item) => item.read_status === "Currently Reading") };
                setFilteredBooks(readingfilter);
              }}>Currently Reading</h6>
              <h6 className="headingiteams">Want to Read</h6>
            </div>
          </div>
          <div className="bookscontainer">
            <div className="search-bar-div">
              <h6>All Books</h6>
              <div className="text-div">
                <input 
                  onChange={searchEle} 
                  value={searchValue} 
                  type="text" 
                  className="form-control" 
                  placeholder="Search books..." 
                  aria-label="Search books" 
                  aria-describedby="search-icon" 
                />
                <span onClick={() => {
                  const filtereddata = { books: fetchedBooks.books.filter((value) => value.title.toLowerCase().includes(searchValue.toLowerCase())) };
                  if (filtereddata.books.length === 0) {
                    navigate('/Home');
                  } else {
                    setFilteredBooks(filtereddata);
                  }
                }} className="input-group-text">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </div>
            <div className="dynamic-div">
              {loading ? <Loader /> :
                filteredBooks.books.map((bookCard) => (
                  <BookCard key={bookCard.id} cardData={bookCard} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bookshelves;

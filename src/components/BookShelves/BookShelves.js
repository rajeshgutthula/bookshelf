import React, { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import cookies from "js-cookie";
import BookCard from "./BookCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import "./BookShelves.css";

const Bookshelves = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState({ books: [], total: 0 });
  const [fetchedBooks, setFetchedBooks] = useState({ books: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [wantToRead, setWantToRead] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const savedWantToRead = JSON.parse(localStorage.getItem("wantToRead")) || [];
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
      ),
    };

    if (filtereddata.books.length === 0) {
      setFilteredBooks(filtereddata);
      setSearchNotFound(true);
    } else {
      setFilteredBooks(filtereddata);
      setSearchNotFound(false);
    }
  };

  const fetchBookshelvesData = useCallback(async () => {
    const jwtToken = cookies.get("jwt_token");
    const booksApi = await fetch("https://apis.ccbp.in/book-hub/books?", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const booksJson = await booksApi.json();
    setTimeout(() => {
      const updatedBooks = booksJson.books.map((book) => ({
        ...book,
        isWantToRead: wantToRead.includes(book.id),
      }));
      setFetchedBooks({ books: updatedBooks, total: booksJson.total });
      setFilteredBooks({ books: updatedBooks, total: booksJson.total });
      setLoading(false);
    }, 1500);
  }, [wantToRead]);

  useEffect(() => {
    const jwtToken = cookies.get("jwt_token");
    if (!jwtToken) {
      navigate("/Login");
    } else {
      fetchBookshelvesData();
    }
  }, [fetchBookshelvesData, navigate]);

  const handleBookmarkToggle = (bookId) => {
    const isAlreadyInWantToRead = wantToRead.includes(bookId);
    const updatedWantToRead = isAlreadyInWantToRead
      ? wantToRead.filter((id) => id !== bookId)
      : [...wantToRead, bookId];
    localStorage.setItem("wantToRead", JSON.stringify(updatedWantToRead));
    setWantToRead(updatedWantToRead);

    const updatedBooks = fetchedBooks.books.map((book) => ({
      ...book,
      isWantToRead: updatedWantToRead.includes(book.id),
    }));
    setFetchedBooks({ books: updatedBooks, total: fetchedBooks.total });
    setFilteredBooks({ books: updatedBooks, total: fetchedBooks.total });
  };

  // Category filter handlers
  const showAll = () => {
    setSelectedCategory("All");
    setFilteredBooks(fetchedBooks);
    setSearchNotFound(false);
  };

  const showRead = () => {
    setSelectedCategory("Read");
    const readingfilter = {
      books: fetchedBooks.books.filter((item) => item.read_status === "Read"),
    };
    setFilteredBooks(readingfilter);
    setSearchNotFound(false);
  };

  const showCurrentlyReading = () => {
    setSelectedCategory("Currently Reading");
    const readingfilter = {
      books: fetchedBooks.books.filter(
        (item) => item.read_status === "Currently Reading"
      ),
    };
    setFilteredBooks(readingfilter);
    setSearchNotFound(false);
  };

  const showWantToRead = () => {
    setSelectedCategory("Want to Read");
    const wantToReadFilter = {
      books: fetchedBooks.books.filter((item) => wantToRead.includes(item.id)),
    };
    setFilteredBooks(wantToReadFilter);
    setSearchNotFound(false);
  };

  return (
    <div className="main-divcontainer">
      <Header />
      <div className="second-div">
        <div className="second-main-div">
          <div className="categories-div">
            <p className="Bookshelves-head">BookShelves</p>
            <div className="categorieitems-div">
              <h6
                className={`All-elements ${
                  selectedCategory === "All" ? "active" : ""
                }`}
                onClick={showAll}
              >
                All
              </h6>
              <h6
                className={`headingiteams ${
                  selectedCategory === "Read" ? "active" : ""
                }`}
                onClick={showRead}
              >
                Read
              </h6>
              <h6
                className={`headingiteams ${
                  selectedCategory === "Currently Reading" ? "active" : ""
                }`}
                onClick={showCurrentlyReading}
              >
                Currently Reading
              </h6>
              <h6
                className={`headingiteams ${
                  selectedCategory === "Want to Read" ? "active" : ""
                }`}
                onClick={showWantToRead}
              >
                Want to Read
              </h6>
            </div>
          </div>
          <div className="bookscontainer">
            <div className="search-bar-div">
              <h6>All Books</h6>
              <div className="text-div">
                <input
                  ref={searchInputRef}
                  onChange={searchEle}
                  onKeyDown={(e) => e.key === "Enter" && executeSearch()}
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
              {loading ? (
                <Loader />
              ) : filteredBooks.books.length === 0 && searchNotFound ? (
                <div className="no-results">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="no-results-icon"
                  />
                  <p>No books found matching your search query.</p>
                </div>
              ) : (
                filteredBooks.books.map((bookCard) => (
                  <BookCard
                    key={bookCard.id}
                    cardData={bookCard}
                    onBookmarkToggle={handleBookmarkToggle}
                    isWantToRead={wantToRead.includes(bookCard.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bookshelves;

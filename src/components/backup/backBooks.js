// import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import {Link} from "react-router-dom";
import { faGoogle, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
// import { faSearch } from '@fortawesome/free-brands-svg-icons';
// import cardObj from "./mockData";
import './BookShelves.css';
import BookCard from './BookCard';
import { useEffect, useState } from "react";


const Bookshelves=()=>{
  // const [demojson,setdemojson]=useState(cardObj);
  const [searchValue,setsearchValue]=useState('');
  const [filteredbooks,setfilteredbooks]=useState([]);
  const [fetchedbooks,setfetchedbooks]=useState([]);
  const [currentbooks,setcurrentbooks]=useState([]);


  const SearchEle=(event)=>{
    setsearchValue(event.target.value);
  }

  useEffect(()=>{
    Bookshelvesapidata();
  },[]);

  const Bookshelvesapidata=async()=>{
    // const booksapi=await fetch("http://127.0.0.1:8000/bookshelves/");
    const booksapi=await fetch("https://apis.ccbp.in/book-hub/books?shelf={bookshelfName}&search={searchText}");

    const booksjson=await booksapi.json();
    console.log(booksjson);
    setfetchedbooks(booksjson);
    setfilteredbooks(booksjson);
    setcurrentbooks(booksjson);
  }

    return(
        <div className="main-divcontainer">
            <nav className="navigationbar">
                {/* <div className="container-fluid"> */}
                    <a className="navbar-brandimg" href="$"><img className="brandlogo" src="/images/Homelogo1.png" alt="homelogo"/></a>
                    <form className="formitemscontainer">
                        {/* <Link to="/home">
                          <h6 className="nav-home">Home</h6>
                        </Link> */}
                        <h6 className="nav-home">Home</h6>
                        <h6 className="nav-bookshelves">bookshelves</h6>
                        <button className="nav-btn" type="submit">logout</button>
                    </form>
                {/* </div> */}
            </nav>
            <div className="second-div">
                <div className="second-main-div">
                    <div className="categories-div">
                        <h5>BookShelves</h5>
                        <div className="categorieitems-div">
                            <h6 className="All" onClick={() => setfilteredbooks(fetchedbooks)}>All</h6>
                            <h6 className="headingiteams" onClick={()=>{
                              const readingfilter=fetchedbooks.filter((item)=>item.read_status==="Read");
                              setfilteredbooks(readingfilter);
                            }}>Read</h6>
                            <h6 className="headingiteams" onClick={()=>{
                              const readingfilter=currentbooks.filter((item)=>item.read_status==="Currently Reading");
                              setfilteredbooks(readingfilter);
                            }}>Currently Reading</h6>
                            <h6 className="headingiteams">Want to Read</h6>
                        </div>
                    </div>
                    <div className="bookscontainer">
                        <div className="search-bar-div">
                            <h6>All Books</h6>
                            <div className="text-div">
                                <input onChange={SearchEle} value={searchValue} type="text" className="form-control" placeholder="Search books..." aria-label="Search books" aria-describedby="search-icon" />
                                <span onClick={()=>{
                                  const filtereddata=fetchedbooks.filter((value)=>value.title.toLowerCase().includes(searchValue.toLowerCase()));
                                  setfilteredbooks(filtereddata);
                                }} className="input-group-text">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </span>
                            </div>
                        </div>
                        <div className="dynamic-div">
                          {
                            filteredbooks.map((bookCard)=>(
                              <BookCard key={bookCard.id} cardData={bookCard}/>
                            ))
                          }
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-icons">
                <FontAwesomeIcon icon={faGoogle}/>
                <FontAwesomeIcon icon={faTwitter}/>
                <FontAwesomeIcon icon={faInstagram}/>
                <FontAwesomeIcon icon={faYoutube}/>
            </div>
            <div className="footer">
                <p>Contact Us</p>
            </div>
        </div>
    ) 
}

export default Bookshelves;


// https://apis.ccbp.in/book-hub/books?
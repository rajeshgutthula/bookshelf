import Login from "./components/LoginForm/Login";
import Register from "./components/RegistrationForm/Register";
import { HashRouter as Router,Route,Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Bookshelves from "./components/BookShelves/BookShelves";
import BookDetail from "./components/BookDetails/BookDetail";

function App() {
    return(
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/Login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/Home' element={<HomePage/>}/>
                    <Route path='/Bookshelves' element={<Bookshelves/>}/>
                    <Route path='/BookDetail/:id' element={<BookDetail/>}/>                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
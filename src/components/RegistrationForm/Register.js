import {Link} from 'react-router-dom';
import "./Register.css";
import loginIcons from "../../images/Bookslogo1.jpeg";

const Register=()=>{

    return(
        <div className="main-container">
            <div className="middlebackground-div">
                <div className="middlediv">
                    <div className="imagedivcontainer">
                        <img className="imageimg" src={loginIcons} alt="login"/>
                    </div>
                    <div className="formcontainer">
                        <div className="corner-btns">
                            <Link to="/Login">
                                <button className="login-btn" type="submit">Login</button>
                            </Link>
                        </div>
                        <div className="registrationformdiv">
                            <form className="registrationformitems">
                                <h2 className="main-heading">Register</h2>
                                <label className="ptag input-label">Email ID:</label>
                                <input className="inputEle" type="email" placeholder="Enter email id"/>
                                <label className="ptag input-label">Username:</label>
                                <input className="inputEle" type="text" placeholder="Enter your name"/>
                                <label className="ptag input-label">Password:</label>
                                <input className="inputEle" type="password" placeholder="Enter your password"/>
                                <label className="ptag input-label">Confirm Password:</label>
                                <input className="inputEle" type="password" placeholder="Enter your password"/>
                                <div>
                                    <button className="signup-btn" type="submit">Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Register;
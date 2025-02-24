import { Link } from 'react-router-dom';
import "./Register.css";
import loginIcons from "../../images/Bookslogo1.jpeg";

const Register = () => {
  return (
    <div className="background-main">
      <div className="register-card">
        <div className="register-image-container">
          <img src={loginIcons} alt="Register Icon" className="register-image" />
        </div>
        <div className="register-content">
          <div className="corner-btns">
            <Link to="/Login">
              <button className="login-btn" type="button">Login</button>
            </Link>
          </div>
          <h2 className="register-heading">Register</h2>
          <form className="registration-form">
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Email ID:</label>
                <input className="inputEle" type="email" placeholder="Enter email id" />
              </div>
              <div className="input-group">
                <label className="input-label">Username:</label>
                <input className="inputEle" type="text" placeholder="Enter your name" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Password:</label>
                <input className="inputEle" type="password" placeholder="Enter your password" />
              </div>
              <div className="input-group">
                <label className="input-label">Confirm Password:</label>
                <input className="inputEle" type="password" placeholder="Confirm your password" />
              </div>
            </div>
            <button className="signup-btn" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

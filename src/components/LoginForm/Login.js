import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import loginIcon from "../../images/Bookslogo1.jpeg";
import "./Login.css";

const Login = () => {
  const [loginValues, setLoginValues] = useState({ username: '', password: '', showSubmitError: false, errorMsg: '' });
  const navigate = useNavigate();

  const onSubmitSuccess = (jwt_token) => {
    cookies.set('jwt_token', jwt_token, { expires: 30 });
    navigate('/Home');
  };

  const onSubmitFailure = (errorMsg) => {
    setLoginValues(prevState => ({
      ...prevState,
      showSubmitError: true,
      errorMsg
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginValues;
    const userDetails = { username, password };

    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const onChangeUsername = (e) => {
    setLoginValues({ ...loginValues, username: e.target.value });
  };

  const onChangePassword = (e) => {
    setLoginValues({ ...loginValues, password: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const jwtToken = cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      navigate('/Home');
    }
  }, [navigate]);

  const { showSubmitError, errorMsg } = loginValues;

  return (
    <div className="background-main">
      <div className="mainn-container">
        <div className="second-main">
          <div className="imagediv">
            <img className="image" src={loginIcon} alt="login" />
          </div>
          <div className="secondHalf">
            <div className="corner-btn">
              <Link to="/register">
                <button className="btn-register" type="button">Register</button>
              </Link>
            </div>
            <div className="loginformdiv">
              <form onSubmit={handleSubmit} className="formitems">
                <h1 className="main-heading">Login</h1>
                <label className="h6 input-label">Username</label>
                <input onChange={onChangeUsername} className="input" type="text" placeholder="Username:rahul" value={loginValues.username} />
                <label className="h6 input-label">Password</label>
                <input
                  onChange={onChangePassword}
                  onKeyDown={handleKeyDown}
                  className="input"
                  type="password"
                  placeholder="Password: rahul@2021"
                  value={loginValues.password}
                />
                <button className="submit-btn" type="submit">Sign In</button>
                {showSubmitError && <p className="error_message">*{errorMsg}</p>}
                <div className="ancor">
                  <a className="anchor-link" href="#0">Forgot password?</a>
                  <a className="anchor-link" href="#0">Not a Member Yet?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import loginIcon from "../../images/Bookslogo1.jpeg";
import "./Login.css";

const Login = () => {
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  });
  const navigate = useNavigate();

  const onSubmitSuccess = (jwt_token) => {
    cookies.set("jwt_token", jwt_token, { expires: 30 });
    navigate("/Home");
  };

  const onSubmitFailure = (errorMsg) => {
    setLoginValues((prevState) => ({
      ...prevState,
      showSubmitError: true,
      errorMsg,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginValues;
    const userDetails = { username, password };

    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();

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
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const jwtToken = cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      navigate("/Home");
    }
  }, [navigate]);

  const { showSubmitError, errorMsg } = loginValues;

  return (
    <div className="background-main">
      <div className="login-card">
        <div className="login-image-container">
          <img src={loginIcon} alt="Login Icon" className="login-image" />
        </div>
        <div className="login-content">
          <h2 className="welcome-text">Welcome Back!</h2>
          <form onSubmit={handleSubmit} className="form-items">
            <label className="input-label">Username</label>
            <input
              onChange={onChangeUsername}
              className="input"
              type="text"
              placeholder="Username: rahul"
              value={loginValues.username}
            />
            <label className="input-label">Password</label>
            <input
              onChange={onChangePassword}
              onKeyDown={handleKeyDown}
              className="input"
              type="password"
              placeholder="Password: rahul@2021"
              value={loginValues.password}
            />
            <button className="submit-btn" type="submit">
              Sign In
            </button>
            {showSubmitError && (
              <p className="error-message">*{errorMsg}</p>
            )}
            <div className="login-links">
              <Link className="link" to="/forgot-password">
                Forgot password?
              </Link>
              <Link className="link" to="/register">
                Not a Member Yet?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

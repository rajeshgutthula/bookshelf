import React from "react";
import {Link} from "react-router-dom";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import "./Login.css";


const Login=()=>{
  const [loginValues,setLoginValues]=useState({username:'',password:'',showSubmitError:false,errorMsg:''});
  const navigate = useNavigate();

  const onSubmitSuccess = (jwt_token) => {
    cookies.set('jwt_token',jwt_token,{expires:30})
    navigate('/Home');
  };
  const onSubmitfailure=(errorMsg)=>{
    setLoginValues(prevState=>({
      ...prevState,
      showSubmitError:true,
      errorMsg
    }));
  }


  const handleSubmit=async (e)=>{
    e.preventDefault();
    const {username,password}=loginValues;
    const userDetails={username,password};

    const url="https://apis.ccbp.in/login";
    const options={
      method:"POST",
      body:JSON.stringify(userDetails)
    }
    const response=await fetch(url,options)
      const data=await response.json()
      if(response.ok===true){
        onSubmitSuccess(data.jwt_token);
      }
      else{
        onSubmitfailure(data.error_msg);
      }
  }

  const onChangeUsername=(e)=>{
    setLoginValues({...loginValues, username:e.target.value});
  }
  const onChangePassword=(e)=>{
    setLoginValues({...loginValues, password:e.target.value});
  }

  useEffect(() => {
    const jwtToken = cookies.get('jwt_token');
    if (jwtToken!==undefined) {
      navigate('/Home');
    }
  }, [navigate]);

  const {showSubmitError, errorMsg } = loginValues;

  return (
    <div className="background-main">
        <div className="mainn-container">
          <div className="second-main">
            <div className="imagediv">
              <img className="image" src="/images/Bookslogo1.jpeg" alt="login"/>
            </div>
            <div className="secondHalf">
              <div className="corner-btn">
                <Link to="/Login">
                  <button className="btn-login" type="submit">Login</button>
                </Link>
                {/* <button className="btn-login" type="submit">Login</button> */}
                <Link to="/register">
                  <button className="btn-register" type="submit">Register</button>
                </Link>
                {/* <button className="btn-register" type="submit">Register</button> */}
              </div>
              <div className="loginformdiv">
                <form onSubmit={handleSubmit} className="formitems">
                  <h1 className="main-heading">Login</h1>
                  <label className="h6 input-label">Username</label>
                  <input onChange={onChangeUsername} className="input" type="text" placeholder="Enter your name" value={loginValues.username}/>
                  <label className="h6 input-label">Password</label>
                  <input onChange={onChangePassword} className="input" type="password" placeholder="Enter your password" value={loginValues.password}/>
                  {/* <div>
                    <button className="submit-btn" type="submit">Sign In</button>
                  </div> */}
                    <button className="submit-btn" type="submit">Sign In</button>
                    {showSubmitError &&<p className="error_message">*{errorMsg}</p>}
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
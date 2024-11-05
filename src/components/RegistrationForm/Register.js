// import React, { useState } from "react";
// import {Link} from 'react-router-dom';
import "./Register.css";

const Register=()=>{
    // const [emailid,setemailid]=useState('');
    // const [username,setusername]=useState('');
    // const [password,setpassword]=useState('');
    // const [conpassword,setconpassword]=useState('');
    

    // const userEmail=(event)=>{
    //     setemailid(event.target.value);
    // }
    // const userName=(event)=>{
    //     setusername(event.target.value);
    // }
    // const userPassword=(event)=>{
    //     setpassword(event.target.value);
    // }

    // const userConpassword=(event)=>{
    //     setconpassword(event.target.value);
    // }
 
    // const submitFun=(e)=>{
    //     e.preventDefault();
    //     const userDetails={
    //         'emailid':emailid,
    //         'username':username,
    //         'password':password,
    //         'conpassword':conpassword   
    //     }
        // console.log(userDetails);
        // let options = {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Accept: "application/json",
        //     },
        //     body: JSON.stringify(userDetails)
        //   };
          
        //   fetch("http://127.0.0.1:8000/login/", options)
        //     .then(function(response) {
        //       return response.json();
        //     })
        //     .then(function(jsonData) {
        //       console.log(jsonData);
        //     });
    //}


    return(
        <div className="main-container">
            <div className="middlebackground-div">
                <div className="middlediv">
                    <div className="imagedivcontainer">
                        <img className="imageimg" src="/images/Bookslogo1.jpeg" alt="login"/>
                    </div>
                    <div className="formcontainer">
                        <div className="corner-btns">
                            {/* <Link to="/register"> */}
                                <button className="register-btn" type="submit">Register</button>
                            {/* </Link> */}
                            {/* <Link to="/Login"> */}
                                <button className="login-btn" type="submit">Login</button>
                            {/* </Link> */}
                        </div>
                        <div className="registrationformdiv">
                            <form className="registrationformitems">
                                <h2 className="main-heading">Register</h2>
                                {/* <input onChange={userEmail} className="inputEle" type="email" placeholder="Enter email id"/> */}
                                <label className="ptag input-label">Email ID:</label>
                                <input className="inputEle" type="email" placeholder="Enter email id"/>
                                {/* <input onChange={userName} className="inputEle" type="text" placeholder="Enter your name"/> */}
                                <label className="ptag input-label">Username:</label>
                                <input className="inputEle" type="text" placeholder="Enter your name"/>
                                {/* <input onChange={userPassword} className="inputEle" type="password" placeholder="Enter your password"/> */}
                                <label className="ptag input-label">Password:</label>
                                <input className="inputEle" type="password" placeholder="Enter your password"/>
                                {/* <input onChange={userConpassword} className="inputEle" type="password" placeholder="Enter your password"/> */}
                                <label className="ptag input-label">Confirm Password:</label>
                                <input className="inputEle" type="password" placeholder="Enter your password"/>
                                <div>
                                    {/* <button onClick={submitFun} className="signup-btn" type="submit">Sign up</button> */}
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
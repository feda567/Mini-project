import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from './logo.png';
import lala from './lala.png'
import { auth } from "../../firebase"
import "./Login.css"
import showImage from "./visibility.svg";
import hideImage from "./visibilityoff.svg";


const Login = () => {
  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        setErr("Please verify your email before logging in.");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setErr(err.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='main-login'>
      <div className='login-container'>
        <div className="left-side">
          <img src={logo} className="applogo" alt="logo" />
          <span className='title'>Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' />
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                className={`password-input ${showPassword ? "show-password" : ""}`}
              />
              <div className="password-toggle-container">
                <img
                  src={showPassword ? hideImage : showImage}
                  alt="Toggle Password Visibility"
                  className="password-toggle-image"
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            {err && <span>{err}</span>}
            <div className="para">New User?<Link to="/signup">Register</Link></div>
            <button>Login</button>
          </form>
        </div>
        <div className="right-side">
          <div className="welcome">WELCOME BACK!!</div>
          <img src={lala} className="applogo1" alt="logo" />
        </div>
      </div>
    </div>
  )
}

export default Login;
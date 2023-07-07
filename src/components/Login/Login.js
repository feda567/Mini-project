import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from './logo.png';
import lala from './lala.png'
import { auth } from "../../firebase"
import "./Login.css"
import showImage from "./visibility.svg";
import hideImage from "./visibilityoff.svg";
import Loader from "../Loader";
const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        setLoading(false);
        setErr("Please verify your email before logging in.");
      } else {

        navigate("/home");
      }
    } catch (err) {
      setLoading(false);
      setErr(err.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    if (auth.currentUser) {
      alert("Please logout before registering.");
    } else {
      navigate("/signup");
    }
  };
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }


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
                  src={showPassword ? showImage : hideImage}
                  alt="Toggle Password Visibility"
                  className="password-toggle-image"
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            {err && <span>{err}</span>}
            <div className="para">
              New User?
              <a href="" onClick={handleRegisterClick}>Register</a>
            </div>
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

import React, { useState, useEffect } from 'react'
import Add from "../../img/addpic.png"
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, db, storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.png';
import './Signup.css'
const Signup = () => {
  const [err, setErr] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const allowedDomains = ['ug.cusat.ac.in', 'pg.cusat.ac.in','cusat.ac.in'];
    const emailParts = email.split('@');
    const emailDomain = emailParts[1];
    if (!allowedDomains.includes(emailDomain)) {
      alert('Invalid email domain!');
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      uploadTask.on(
        (error) => {
          alert('Error uploading avatar. Please try again.')
          setErr(true)
        },
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
    
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
    
              await setDoc(doc(db, "userChats", res.user.uid), {});
    
              await sendEmailVerification(res.user); // send email verification
    
              setIsEmailSent(true); // set state to indicate that email was sent
              alert('Please verify your email and refresh the page.')
    
            } catch (err) {
              alert('Error creating user. Please try again.')
              console.log(err);
              setErr(true);
            }
          });
        }
      );
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert('Email already registered.')
        setErr("");
      } else {
        alert('Error creating user. Please try again.')
        setErr(true);
      }
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          navigate("/home");
        }
      }
      
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <div className='main-signup'>
      <div className='signup-container'>
        <div className='left-side'>
        <div className='welcome'>WELCOME ABOARD!</div>
      <img src={logo} className="applogo" alt="logo"  />
        <span className='logo'>engage,inspire,connect..</span>
        </div>
        <div className='right-side'>
        <div className='title'>SIGN UP</div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='User name'></input> 
          <input type="email" placeholder='Email'></input>
          <input type="password" placeholder='Password' />
          <input style={{ display: "none" }} type="file" id='file' />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <div className='upload'>Upload Profile Picture</div>
          </label>
          <button>Sign up</button>
          {err}
          {isEmailSent && <span></span>}
          <div className='para'>Already have an account? <Link to="/">Login</Link> </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
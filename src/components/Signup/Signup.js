import React, { useState, useEffect } from 'react'
import Add from "../../img/addpic.png"
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth, db, storage } from "../../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.png';
import './Signup.css'
import showImage from "./showpassword.svg";
import hideImage from "./hidepassword.svg";
import userImage from "./user.svg";

const Signup = () => {
  const [err, setErr] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
      const allowedDomains = ['ug.cusat.ac.in', 'pg.cusat.ac.in', 'cusat.ac.in'];
      const emailParts = email.split('@');
      const emailDomain = emailParts[1];
      
      if (!allowedDomains.includes(emailDomain)) {
        alert('Invalid email domain!');
        return;
      }
    
      if (displayName === "") {
        alert("Enter a valid username");
        return;
      }
    
      const usernameTaken = await isUsernameTaken(displayName);
      if (usernameTaken) {
        alert('Username already taken. Please choose a different username.');
        return;
      }
      
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(
          storage,
          profilePicture ? displayName : `${displayName}-default`
        );
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          (error) => {
            alert('Error uploading avatar. Please try again.');
            setErr(true);
          },
          () => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: profilePicture ? downloadURL : userImage,
                });
    
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", res.user.uid), {});
                await sendEmailVerification(res.user); 
                setIsEmailSent(true); 
                alert('Please verify your email and refresh the page.');
              } catch (err) {
                alert('Error creating user. Please try again.');
                console.log(err);
                setErr(true);
              }
            });
          }
        );
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          alert('Email already registered.');
          setErr("");
        } else {
          alert('Error creating user.');
          setErr(true);
        }
      }
    };
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          navigate("/interest");
        }
      }

    });
    return unsubscribe;
  }, [navigate]);
  const isUsernameTaken = async (username) => {
    const usersSnapshot = await db.collection('users').where('displayName', '==', username).get();
    return !usersSnapshot.empty;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword)
  };

  return (
    <div className='main-signup'>
      <div className='signup-container'>
        <div className='left-side'>
          <div className='welcome'>WELCOME ABOARD!</div>
          <img src={logo} className="applogo" alt="./images/spin-loader.svg" />
          <span className='logo'>engage,inspire,connect..</span>
        </div>
        <div className='right-side'>
          <div className='title'>SIGN UP</div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='User name'></input>
            <input type="email" placeholder='Email'></input>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                className={`password-input ${showPassword ? "show-password" : ""}`}
              />
              <img
                src={showPassword ? showImage : hideImage}
                alt="Toggle Password Visibility"
                className="password-toggle-image"
                onClick={toggleShowPassword}
              />
            </div>
            <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />

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

export default Signup;

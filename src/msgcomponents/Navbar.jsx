import React, { useContext, useState, useEffect, useRef } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Navbar = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      setLoading(false);
    }
  }, [currentUser]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      const imageRef = ref(storage, `${currentUser.uid}/image`);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
              updateProfile(auth.currentUser, { photoURL: url })
                .then(() => {
                  updateDoc(doc(db, "users", currentUser.uid), { photoURL: url })
                    .then(() => {
                      console.log("User photoURL updated successfully.");
                    })
                    .catch((error) => console.log(error.message));
                })
                .catch((error) => console.log(error.message));
            })
            .catch((error) => {
              console.log(error.message, 'error getting the image url');
            });
          setImage(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [currentUser, image]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='navbar'>
      <span className='logo'>CUSAT CONNECTS</span>
      <div className='user'>
        <img
          src={url ? url : currentUser.photoURL}
          alt=''
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <span>{currentUser.displayName}</span>
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default Navbar;

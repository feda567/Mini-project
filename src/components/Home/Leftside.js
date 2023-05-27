import {connect} from "react-redux";
import Pic from "../../img/photo.svg"
import {useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, storage, db} from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {  doc, updateDoc } from "firebase/firestore";
import {  updateProfile } from 'firebase/auth';
import{
  Container,
  ArtCard,
  UserInfo,
  CardBackground,
  Photo,
  Link,
  Widget,
} from "./StyleLeftside";

const Leftside = (props) => {
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
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo img src={url ? url : currentUser.photoURL} alt={Pic} onClick={handleImageClick}
          style={{ cursor: 'pointer' }} />
          <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
            <Link>Welcome, {props.user ? props.user.displayName:"there"}!</Link>
          </a>
          <a>
           
          </a>
        </UserInfo>
        <Widget>
          
        </Widget>
        
      </ArtCard>

     
    </Container>
  );
};





const mapStateToProps=(state)=>{
  return {
    user:state.userState.user,
  }
}


export default connect(mapStateToProps)(Leftside);
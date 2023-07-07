import { connect } from "react-redux";
import Pic from "../../img/photo.svg";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, storage, db } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import {
  Container,
  InterestsContainer,
  InterestInput,
  InterestButton,
  AddInterestForm,
  AddInterestButton,
  ArtCard,
  CardBackground,
  Photo,
  Link,
  SharedActor,
  EditModel,
  Widget,
  AboutText,TextArea
} from "./StyleProfile";
import Posts from "./Posts";
import Loader from "../Loader";
const Profile = (props) => {

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [showAboutInput, setShowAboutInput] = useState(false);
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unsubscribe = onSnapshot(
        doc(db, "users", currentUser.uid),
        (doc) => {
          if (doc.exists()) {
            const userInterests = doc.data().interests;
            if (userInterests) {
              setInterests(userInterests);
            }
            const userAbout = doc.data().about;
            if (userAbout) {
              setAboutText(userAbout);
            }
          }
        }
      );
      return () => unsubscribe();
    }
  }, [currentUser]);

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

  const handleNewInterestChange = (e) => {
    setNewInterest(e.target.value);
  };

  const addNewInterest = (e) => {
    e.preventDefault(); 

    if (newInterest) {
      const userRef = doc(db, "users", currentUser.uid);
      updateDoc(userRef, {
        interests: {
          ...interests,
          others: [...(interests.others || []), newInterest],
        },
      })
        .then(() => {
          console.log("New interest added successfully.");
          setNewInterest("");
          setShowDropdown(false);
          setShowInputField(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddInterestClick = () => {
    setShowInputField(true);
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
                  updateDoc(doc(db, "users", currentUser.uid), {
                    photoURL: url,
                  })
                    .then(() => {
                      console.log("User photoURL updated successfully.");
                    })
                    .catch((error) => console.log(error.message));
                })
                .catch((error) => console.log(error.message));
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
          setImage(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [currentUser, image]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  

  const handleAddAbout = () => {
    setShowAboutInput(true);
  };
  const handleAboutInputChange = (e) => {
    setAboutText(e.target.value);
  };

  const addAbout = (e) => {
    e.preventDefault();
    if (aboutText) {
      const userRef = doc(db, "users", currentUser.uid);
      updateDoc(userRef, { about: aboutText })
        .then(() => {
          console.log("About added successfully.");
          setShowAboutInput(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  return (
   
      <Container>
        <Widget>
      <CardBackground />
        <ArtCard>
          
          
            <Photo
              img
              src={url ? url : currentUser.photoURL}
              alt={Pic}
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <Link>{props.user ? props.user.displayName : "there"}
          
          {aboutText && (
              <AboutText>{aboutText}</AboutText>
            )}
            
            <SharedActor>
              <button onClick={() => toggleDropdown()}>
                <img src="./images/ellipsis.svg" alt="" />
              </button>
              {showDropdown && (
                <EditModel>
                  <li onClick={() => handleAddInterestClick()}>
                    <img src="/images/addicon.png" alt="" />
                    <h6>Add new Interest</h6>
                  </li>
                  <li onClick={() => handleAddAbout()}>
                    <img src="/images/addicon.png" alt="" />
                    <h6>Add About</h6>
                  </li>
                </EditModel>
              )}
            </SharedActor>
            {showAboutInput &&(
          <form onSubmit={addAbout}>
            <TextArea
              type="text"
              placeholder="Add about details.."
              className="about-input"
              value={aboutText}
              onChange={handleAboutInputChange}
            />
            <AddInterestButton type="submit" className="add-about-button">
              SUBMIT
            </AddInterestButton>
          </form>

        ) }
            {interests && (
              <div>
                <InterestsContainer className="interests-container">
                  {interests.col1 &&
                    interests.col1.map((interest) => (
                      <InterestButton key={interest}>
                        {interest}
                      </InterestButton>
                    ))}
                  {interests.col2 &&
                    interests.col2.map((interest) => (
                      <InterestButton key={interest}>
                        {interest}
                      </InterestButton>
                    ))}
                  {interests.col3 &&
                    interests.col3.map((interest) => (
                      <InterestButton key={interest}>
                        {interest}
                      </InterestButton>
                    ))}
                  {interests.col4 &&
                    interests.col4.map((interest) => (
                      <InterestButton key={interest}>
                        {interest}
                      </InterestButton>
                    ))}
                  {interests.others &&
                  interests.others
                  .filter((interest) => interest !== "")
                  .map((interest) => (
                    <InterestButton key={interest} className="interest-button">
                      {interest}
                    </InterestButton>
                  ))}
                  
                  {showInputField && (
                    <AddInterestForm onSubmit={addNewInterest}>
                      <InterestInput
                        type="text"
                        placeholder="Add new interest.."
                        className="interest-input"
                        value={newInterest}
                        onChange={handleNewInterestChange}
                      />
                      <AddInterestButton type="submit" className="add-interest-button">
                        Add
                      </AddInterestButton>
                    </AddInterestForm>
                  )}
                 
                   </InterestsContainer>
                </div>
            )}
            </Link>
        
        </ArtCard>
        </Widget>
        <Posts />
      </Container>
   
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Profile);

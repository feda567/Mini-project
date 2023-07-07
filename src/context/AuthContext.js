import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
export const AuthContext = createContext({
  fetchDetails: () => Function,
  fetchPostDetails: () => Function,
  fetchVideoDetails: () => Function,
  data: null,
  allUserDetails: null,
  postDetails: null,
  videoDetails: null,
});

export const useUser = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const allDetailsArray = [];
  const postDetailsArray = [];
  const VideoDetailsArray = [];

  const [postDetails, setPostDetails] = useState([]);
  const [videoDetails, setvideoDetails] = useState([]);
  const [allUserDetails, setAllDetails] = useState([]);

  async function fetchDetails() {
    const docSnap = await getDocs(collection(db, "users"));
    docSnap.forEach((doc) => {
      allDetailsArray.push(doc.data())
    });
    setAllDetails(allDetailsArray)

  }

  async function fetchPostDetails(email) {
    const docSnap = await getDocs(collection(db, "articles"));
    docSnap.forEach((doc) => {
      if (doc.data().actor.description === email && doc.data().shareImg !== "") {
        postDetailsArray.push(doc.data().shareImg)
      }
    });
    setPostDetails(postDetailsArray)
  }

  async function fetchVideoDetails(email) {
    const docSnap = await getDocs(collection(db, "articles"));
    docSnap.forEach((doc) => {
      if (doc.data().actor.description === email && doc.data().video !== "") {
        VideoDetailsArray.push(doc.data().video)
      }
    });
    setvideoDetails(VideoDetailsArray)
  }

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const value = { fetchDetails, currentUser, allUserDetails, fetchPostDetails, postDetails, fetchVideoDetails, videoDetails };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};








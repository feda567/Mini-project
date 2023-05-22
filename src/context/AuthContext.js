import { createContext, useEffect, useState,useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase.js";
import { collection,  getDocs } from "firebase/firestore";
export const AuthContext = createContext({
  fetchDetails: () => Function,
  data:null,
});

export const useUser = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const data = [];

  async function fetchDetails(collectionRef) {
    const docSnap = await getDocs(collection(db, "users"));
    docSnap.forEach((doc) => {
      data.push(doc.data().displayName);
    });
  }

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const value = { fetchDetails, data,currentUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};








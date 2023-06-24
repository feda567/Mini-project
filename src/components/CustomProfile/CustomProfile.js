import {useUser} from "../../context/AuthContext";
import {useEffect, useState} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const CustomProfile = () => {
    const [detail, setDetail] = useState([])

    useEffect(() => {
        const fetchUserDetails = async (uid) => {
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("uid", "==", uid));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No user found with the provided uid");
                    return null;
                }

                const userDetails = [];

                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    userDetails.push(userData);
                });
                setDetail(userDetails)
                console.log("User details:", userDetails);
                return userDetails;
            } catch (error) {
                console.log("Error fetching user details:", error);
                return null;
            }
        };
        fetchUserDetails("HqyQopQRejRLCRE9dRaFDMU0fZh2")

    },)

    return (
        <div>
            <p>hy,{detail[0]?.displayName}</p>
            <p>hy,{detail[0]?.email}</p>
            <img src={detail[0]?.photoUrl} alt="image"/>
        </div>
    );
};

export default CustomProfile;
import "./index.css"
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/AuthContext";

const CustomProfile = () => {
    const [detail, setDetail] = useState([])
    const { slug } = useParams()
    const { fetchPostDetails, postDetails, fetchVideoDetails, videoDetails } = useUser()
    
    const [interests, setInterests] = useState([]);
    const [posts, setPosts] = useState(null)
    const [videos, setVideos] = useState(null)


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
              return userDetails;
          } catch (error) {
              console.log("Error fetching user details:", error);
              return null;
          }
      };
      fetchUserDetails(slug)

  },[slug])


  useEffect(() => {
      if (detail.length > 0) {
        fetchPostDetails(detail[0]?.email);
        fetchVideoDetails(detail[0]?.email);
      }
      setPosts(postDetails);
      setVideos(videoDetails);
    }, [detail, fetchPostDetails, fetchVideoDetails, postDetails, videoDetails]);

    console.log("continous fetching");

    return (
        <div className="main-div">
            <div className="tab-content">
                <img className="image-div" src={detail[0]?.photoURL} alt="" />
                <div className="Link">
                <p className="profile-name">{detail[0]?.displayName}</p>
                <p className="profile-about">{detail[0]?.about}</p>
                {interests && (
              <div>
                <div className="interests-container">
                  {detail[0]?.interests.col1 &&
                    detail[0]?.interests.col1.map((interest) => (
                      <button className="interest-button" key={interest}>
                        {interest}
                      </button>
                    ))}
                  {detail[0]?.interests.col2 &&
                    detail[0]?.interests.col2.map((interest) => (
                      <button className="interest-button" key={interest}>
                        {interest}
                      </button>
                    ))}
                  {detail[0]?.interests.col3 &&
                    detail[0]?.interests.col3.map((interest) => (
                      <button className="interest-button" key={interest}>
                        {interest}
                      </button>
                    ))}
                  {detail[0]?.interests.col4 &&
                    detail[0]?.interests.col4.map((interest) => (
                      <button className="interest-button" key={interest}>
                        {interest}
                      </button>
                    ))}
                  {detail[0]?.interests.others &&
                  detail[0]?.interests.others
                  .filter((interest) => interest !== "")
                  .map((interest) => (
                    <button className="interest-button" key={interest} >
                      {interest}
                    </button>
                  ))}
                   </div>
                </div>
            )}
                </div>
            </div>
            <div className="post-section">
                <div className="post-section-content">
                    <h1>Images</h1>
                    <div className="post-div">
                        {posts && posts.length > 0 ? (
                            posts.map((val) => (
                                <img src={val} alt="" height={"230px"} width={"230px"} />
                            ))
                        ) : (
                            <p>No posts available</p>
                        )}
                    </div>
                    <h1>Videos</h1>
                    <div className="videos-div">
                        {videos && videos.length > 0 ? (
                            videos.map((val) => (
                                <video src={val}  height={"180px"} width={"230px"} controls />
                            ))
                        ) : (
                            <p>No videos available</p>
                        )}
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default CustomProfile;

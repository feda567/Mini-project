import { connect } from 'react-redux';
import { signOutAPI } from "../../actions";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, storage, db } from "../../firebase";
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./Home.css";
import { useUser } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Content,
    Logo,
    Search,
    SearchIcon,
    Nav,
    NavListWrap,
    NavList,
    SignOut,
    User
} from "./StyleHeader";


const Header = (props) => {
    const handleSignOut = async () => {
        try {
            await props.signOut();
        } catch (error) {
            console.log(error);
        }
    };

    const { fetchDetails, allUserDetails } = useUser();
    const [allDetails, setAllDetails] = useState(null)
    console.log("all detail");
    const history = useNavigate();
    const [searchKey, setSearchKey] = useState('');
    const handleSearchKeyChange = (event) => {
        setSearchKey(event.target.value);
    };

    const filteredObjects = allDetails?.filter((obj) =>
        obj.displayName.toLowerCase().includes(searchKey.toLowerCase())
    );

    useEffect(() => {
        fetchDetails();
        setAllDetails(allUserDetails);

        return () => {
            allDetails?.splice(0, allDetails?.length)
        };
    }, [allUserDetails]);

    const handleObjectClick = (uid) => {
        // Find the object with the matching UID
        history(`/customprofile/${uid}`);
    };
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
            <Content>
                <Logo>
                    <a href="/home">
                        <img src="/images/cusatconnects.svg" alt="" />
                    </a>
                </Logo>
                <Search className="search">
                    <div>
                        <div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchKey}
                                onChange={handleSearchKeyChange}
                            />
                        </div>
                        <SearchIcon>
                            <img src="/images/search-icon.svg" alt="" />
                        </SearchIcon>
                        {filteredObjects.length !== 0 && searchKey?.length > 0 && (
                            <div className="data-window">
                                {filteredObjects.map((value) => {
                                    return (
                                        <div className="window-box">
                                            <p
                                                className="window-col"
                                                onClick={() => handleObjectClick(value.uid)}>
                                                {value.displayName}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className="active">
                            <a href="/home">
                                <img src="/images/nav-home.svg" alt="" />
                                <button className='b'>Home</button>
                            </a>
                        </NavList>

                        <NavList>
                            <Link to="/profile">
                                <img src="/images/profile.svg" height={25} alt="" />
                                <button className="b">Profile</button>
                            </Link>
                        </NavList>

                        <NavList>

                            <Link to="/messaging">
                                <img src="/images/nav-messaging.svg" alt="" />
                                <button className="b">Messaging</button>
                            </Link>
                        </NavList>
                        <User>
                            <a>
                                <img
                                    src={url ? url : currentUser.photoURL}
                                    alt=''
                                    onClick={handleImageClick}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>
                                    Me
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </a>
                            <SignOut>
                                <Link to="/" onClick={handleSignOut}>Sign Out</Link>

                            </SignOut>
                        </User>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

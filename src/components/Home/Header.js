import styled from "styled-components";
import {connect} from 'react-redux';
import { signOutAPI } from "../../actions";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {  auth, storage,db } from "../../firebase";
import {  updateProfile } from 'firebase/auth';
import {  doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./Home.css";
import { useUser } from "../../context/AuthContext";

const Header = (props) => { 
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const { fetchDetails, data } = useUser();
  console.log(data);

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setWordEntered(searchWord);

    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    fetchDetails();

    return () => {
      data.splice(0, data.length);
    };
  }, []);

  


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
                value={wordEntered}
                onChange={handleFilter}
              />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
            {filteredData.length !== 0 && (
              <div className="data-window">
                {filteredData.slice(0, 15).map((value) => {
                  return (
                    <div className="window-box">
                      <p
                        className="window-col"
                        onClick={(e) => console.log(e.target.textContent)}>
                        {value}
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
              <a>
                <img src="/images/nav-home.svg" alt="" />
                <button className='b'>Home</button>
              </a>
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

              <SignOut onClick={()=>props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>

          
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background:#fff;
  margin-left:12px;
  margin-top:10px;
  border-bottom: 1px solid rgba(0.2, 0.2, 0.2, 0.08);
  border-radius: 10px;
  left: 10;
  padding: 0 24px;
  position: relative;
  top: 20;
  width: 94%;
  right:20;
  z-index: 100;
  
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 80px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #dce6f1;
      border-radius: 5px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 1024px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
  .b{
    background-color:white;
    border:none;
    cursor:pointer;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 180px;
    position: relative;
    text-decoration: none;
    cursor:pointer;
    button {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  a > svg {
    width: 10px;
    border-radius: 50%;
  }
  a > img {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
      cursor:pointer;
    }
  }
`;
const mapStateToProps=(state)=>{
  return{
    user:state.userState.user,
  };
}

const mapDispatchToProps=(dispatch)=>({
  signOut:()=>dispatch(signOutAPI()),
});
export default connect(mapStateToProps,mapDispatchToProps)(Header);
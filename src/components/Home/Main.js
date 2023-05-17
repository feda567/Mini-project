import { useEffect,useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticlesAPI } from "../../actions";
import ReactPlayer from "react-player";
import fuzzyTime from "fuzzy-time";
import {updateDoc,doc} from "firebase/firestore";
import { db } from "../../firebase";


const Main = (props) => {
  const [showModal,setShowModal]=useState("close");

  useEffect(()=>{
    props.getArticles();
  },[]);

  const fetchLikes = (articleId, likes) => {
    const updatedLikes = likes.some((l) => l.email === props.user.email)
      ? likes.filter((l) => l.email !== props.user.email)
      : [
          { name: props.user.displayName, email: props.user.email, photo: props.user.photoURL },
          ...likes,
        ];
  
    // Update the likes in the database or API
    updateDoc(doc(db, "articles", articleId), {
      likes: updatedLikes,
    });
  };

  const handleClick=(e)=>{
    e.preventDefault();
    if(e.target!==e.currentTarget){
      return;
    }
    


    switch(showModal){
      case "open":
        setShowModal("close");
        break;
      case "close":
          setShowModal("open");
          break;
      default:
        setShowModal("close");
        break;
        
    }
  }
  return( 
    <>
    
  <Container>
    <ShareBox>
    <div>
      { props.user && props.user.photoURL ? (
      <img src={props.user.photoURL}/>
      ):(
      <img src="/images/user.svg" alt=""/>      
      )}
        <button onClick={handleClick}
        disabled={props.loading ? true:false}>
          Start a post
          </button>
      </div>
      <div>
        <button>
          <img src="/images/photo-icon.svg" className="feed-images" alt=""/>
          <button onClick={handleClick}
                  disabled={props.loading ? true:false}
                  className="uploading"
          >
               Photo
          </button>
        </button>
        <button>
          <img src="/images/video-icon.svg" className="feed-images" alt=""/>
          <button onClick={handleClick}
                  disabled={props.loading ? true:false}
                  className="uploading"
          >
               Video
          </button>
        </button>
        <button>
          <img src="/images/event-icon.svg" className="feed-images" alt=""/>
          <span>Event</span>
        </button>
        <button>
          <img src="/images/poll-icon.svg" className="feed-images" alt=""/>
          <span>Poll</span>
        </button>
      </div>
    </ShareBox>
    <Content>
      {
        props.loading && <img src='./images/spin-loader.svg'/>
      }
    {props.articles.length>0 &&
    props.articles.map((article,key)=>(
      <Article key={key}>
        <SharedActor>
          <a>
            <img src={article.actor.image} alt=""/>
            <div>
              <span>{article.actor.title}</span>
              <span>{article.actor.description}</span>
              <span>{fuzzyTime(article.actor.date)}</span>
            </div>
          </a>
          </SharedActor>
          <Description>
            {article.description}
          </Description>
          <SharedImg>
            <a>
              {
                !article.shareImg && article.video ? (<ReactPlayer width={'100%'} height={'50%'} url={article.video} controls={true} />
                ):(
                  article.shareImg && <img src={article.shareImg}/>
                )
              }
            </a>
          </SharedImg>
          <SocialCounts>
          <li>
                {article.likes.length > 0 && (
                  <img
                    className="likes"
                    src="images/red-hearts.svg"
                    alt="likes"
                  />
                )}
                <span>
                {article.likes.length} {article.likes.length === 1 ? "Like" : "Likes"}
                </span>
              </li>
            <li>
              <a>
                {article.comments} 
              </a>
              </li>
          </SocialCounts>
          <SocialActions>
          <button
      className={
        article.likes.some((l) => l.email === props.user.email) ? "active" : ""
      }
      onClick={(e) => {
        fetchLikes(article.id, article.likes);
      }}
    >
                <img className="unLiked" src='/images/like-icon.svg' alt="" />
                <img
                  className="liked"
                  src='/images/liked-icon.svg'
                  alt=""
                />
  </button>
          <button>
            <img src="/images/comment-icon.svg" className="review" alt=""/>
            <span></span>
          </button>
          
          </SocialActions>
      </Article>
    ))}
      </Content>
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>

    </>
    );
};
  

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align:center;
  overflow:hidden;
  margin-bottom:8 px;
  background-color:#fff;
  border-radius:5 px;
  position:relative;
  border:none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox=styled(CommonCard)`
 display:flex;
 flex-direction:column;
 color:#ffff;
 margin:0 0 8px;
 background:white;
 div{
    button{
      outline:none;
      color:rgb(0,0,0,.6);
      font-size:14px;
      line-height:1.5;
      min-height:48px;
      background:transparent;
      border:none;
      display:flex;
      align-items:center;
      font-weight:600;
    }
    :first-child{
      display:flex;
      align-items: center;
      padding:8px 16px 0px 16px;
      img{
        width:48px;
        border-radius:50%;
        margin-right:8px;
      }
      button{
        margin:4px 0;
        flex-grow:1;
        border-radius:35px;
        padding-left:16px;
        border:1px solid rgba(0,0,0,.15);
        background-color:white;
        text-align:left;
      }
    }
    :nth-child(2){
      display:flex;
      flex-wrap:wrap;
      justify-content:space-around;
      padding-bottom:4px;
      button{
        img{
          margin:0 4px 0 -2px;
        }
        span,.uploading{
          color:#70b5f9;
          cursor:pointer;
        }
      }
    }
    .feed-images{
      display:flex;
      width:28px;
      margin-right:8px;
    }
 }
  `;
const Article=styled(CommonCard)`
padding:0;
margin:0 0 8px;
overflow:visible;
`;

const SharedActor=styled.div`
padding-right:40px;
flex-wrap:nowrap;
padding:12px 16px 0;
margin-bottom:8px;
align-items:center;
display:flex;
a{
  margin-right:12px;
  flex-grow:1;
  overflow:hidden;
  display:flex;
  text-decoration:none;

  img{
    width:48px;
    height:48px;
  }
  >div{
    display:flex;
    flex-direction:column;
    flex-grow:1;
    flex-basis:0;
    margin-left:8px;
    overflow:hidden;

    span{
      text-align:left;
      :first-child{
        font-size:14px;
        font-weight:700;
        color:rgba(0,0,0,1);
      }
      :nth-child(n+1){
        font-size:12px;
        color:rgba(0,0,0,0.6);
      }
    }
  }
}
button{
  position:absolute;
  right:12px;
  top: 0;
  background:transparent;
  border:none;
  outline:none;
  padding:.5px;
}
`;

const Description=styled.div`
padding:0 16px;
overflow:hidden;
color:rgba(0,0,0,.9);
font-size:14px;
text-align:left;
  `;

const SharedImg=styled.div`
margin-top:8px;
width:100%;
display:block;
position:relative;
background-color:#f9fafb;
img{
  object-fit:contain;
  width:100%;
  height:100%;
}
`;

const SocialCounts=styled.ul`
line-height:1.3;
display:flex;
align-items:flex-start;
overflow:auto;
margin:0 16px;
padding:8px 0;
border-bottom:1px solid #e9e5df;
list-style:none;
li{
  margin-right:5px;
  font-size:12px;
  button{
    display:flex;
    border:none;
    background-color:white;
  }
  img{
    width:25px;
  }
}
`;
const SocialActions=styled.div`
align-items:center;
display:flex;
margin:0;
justify-content:flex-start;
min-height:40px;
padding:4px 8px;
button{
  display:inline-flex;
  align-items:center;
  padding:8px;
  background:transparent;
  border:none;
  .liked{
      display:none;
      width:30px;
    }
    .unLiked{
      display:flex;
     width:30px;
    }

    &:hover{
      background-color: rgba(0, 0, 0, 0.08);
    }

    &.active {
      color: #ab0c1c;
      .liked {
        display: inline-block;
      }
      .unLiked {
        display: none;
      }
    }
  @media(min-width:768px){
  }

  .review{
  display:flex;
  width:25px;
  
}
}
`;
const Content=styled.div`
    text-align:center;
    &>img{
      width:30px;
    }
`;

const mapStateToProps=(state)=>{
  return{
    loading:state.articleState.loading,
    user:state.userState.user,
    articles:state.articleState.articles.map((article)=>({
      ...article,
      id:state.articleState.articles.find((a)=>a.id===article.id)
      .id,
    })),
    articleIDs: state.articleState.articles.map((article) => article.id),
  };
};
const mapDispatchToProps=(dispatch)=>({
      getArticles:()=>dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps,mapDispatchToProps)(Main);
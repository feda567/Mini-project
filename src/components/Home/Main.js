import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticlesAPI } from "../../actions";
import ReactPlayer from "react-player";
import fuzzyTime from "fuzzy-time";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Comment from "./Comment";
import {
  SharedActor,
  EditModel,
  Description,
  SharedImg,
  SocialCounts,
  SocialActions,Container,
  ShareBox,
  Content,
  Article
} from './StyleMain';

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  const [showComments, setShowComments] = useState([]);
  const [showEditPost, setShowEditPost] = useState(false);

  useEffect(() => {
    props.getArticles();
  }, []);

  const fetchLikes = (articleId, likes) => {
    const updatedLikes = likes.some((l) => l.email === props.user.email)
      ? likes.filter((l) => l.email !== props.user.email)
      : [
          { name: props.user.displayName, email: props.user.email, photo: props.user.photoURL },
          ...likes,
        ];
    updateDoc(doc(db, "articles", articleId), {
      likes: updatedLikes,
    });
  };

  const deletePost = (id) => {
    deleteDoc(doc(db, "articles", id));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
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
  };

  return (
    <>
      <Container>
        <ShareBox>
          <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button onClick={handleClick} disabled={props.loading ? true : false}>
                  Start a post
              </button>
          </div>
          <div>      
            <button>
              <img src="/images/photo-icon.svg" className="feed-images" alt="" />
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
                className="uploading"
              >
                  Photo
              </button>
            </button> 
            <button>
              <img src="/images/video-icon.svg" className="feed-images" alt="" />
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
                className="uploading"
              >
                 Video
              </button>
            </button>
            <button>
              <img src="/images/announcement-icon.svg" className="feed-images" alt="" />
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
                className="uploading"
              >
                  Announcement
              </button>
            </button>
            
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src='./images/spin-loader.svg' />}
          {props.articles.length > 0 &&
            props.articles.map((article, key) => (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image} alt="" />
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{fuzzyTime(article.actor.date)}</span>
                    </div>
                  </a>
                  <button onClick={() => setShowEditPost((prev) => (prev === article.id ? null : article.id))}>
                    {article.actor.description === props.user.email && (
                      <img src="./images/ellipsis.svg" alt="" />
                    )}
                  </button>
                  {showEditPost === article.id && article.actor.description === props.user.email && (
                    <EditModel>
                      <li onClick={() => deletePost(article.id)}>
                        <img src="/images/delete.webp" alt="" />
                        <h6>Delete post</h6>
                      </li>
                    </EditModel>
                  )}
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImg>
                  <a>
                    {!article.shareImg && article.video ? (
                      <ReactPlayer width={'100%'} height={'50%'} url={article.video} controls={true} />
                    ) : (
                      article.shareImg && <img src={article.shareImg} />
                    )}
                  </a>
                </SharedImg>
                <SocialCounts>
                  <li>
                    {article.likes.length > 0 && (
                      <img className="likes" src="images/red-hearts.svg" alt="" />
                    )}
                    <span className="likes">
                      {article.likes.length} {article.likes.length === 1 ? " like • " : " likes •"}
                    </span>
                  </li>
                  <li onClick={() => setShowComments((prev) => [...prev, article.id])}>
                    <p className="comments">
                      {article.comments ? (article.comments.length === 1 ? '1 comment' : `${article.comments.length} comments`) : '0 comments'}
                    </p>
                  </li>
                </SocialCounts>
                <SocialActions>
                  <button
                    className={article.likes.some((l) => l.email === props.user.email) ? "active" : ""}
                    onClick={(e) => {
                      fetchLikes(article.id, article.likes);
                    }}
                  >
                    <img className="unLiked" src='/images/like-icon.svg' alt="" />
                    <img className="liked" src='/images/liked-icon.svg' alt="" />
                  </button>
                  <button onClick={() => setShowComments((prev) => [...prev, article.id])}>
                    <img src="/images/comment-icon.svg" className="review" alt="" />
                    <span></span>
                  </button>
                </SocialActions>
                {showComments.includes(article.id) && (
                  <Comment
                    photo={props.user?.photoURL}
                    comments={article.comments}
                    user={props.user}
                    id={article.id}
                  />
                )}
              </Article>
            ))}
        </Content>
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles.map((article) => ({
      ...article,
      id: state.articleState.articles.find((a) => a.id === article.id).id,
    })),
    articleIDs: state.articleState.articles.map((article) => article.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
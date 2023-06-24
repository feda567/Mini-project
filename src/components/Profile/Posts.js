import { useEffect, useState } from "react";
import PostModal from "../Home/PostModal";
import { connect } from "react-redux";
import { getArticlesAPI } from "../../actions";
import ReactPlayer from "react-player";


import { SharedImg, Container, Content, Article } from "./StylePosts";

const Posts = (props) => {
  const [showModal, setShowModal] = useState("close");


  useEffect(() => {
    props.getArticles();
  }, []);



  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    setShowModal(showModal === "open" ? "close" : "open");
  };

  return (
    <>
      <Container>
        
      <Content>
  {props.loading && <img src="./images/spin-loader.svg" />}
  {props.articles.length > 0 &&
    props.articles.map((article, key) => (
      <Article key={key}>
        <SharedImg>
          <a>
            {!article.shareImg && article.video ? (
              <ReactPlayer
                width="100%"
                height="100%" // Set the height to the desired value, e.g., "200px"
                url={article.video}
                controls={true}
              />
            ) : (
              article.shareImg && <img src={article.shareImg} alt="Post" />
            )}
          </a>
        </SharedImg>
      </Article>
    ))}
</Content>


        
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
    const currentUserEmail = state.userState.user.email;
    return {
      loading: state.articleState.loading,
      user: state.userState.user,
      articles: state.articleState.articles
        .filter((article) => article.actor.description === currentUserEmail)
        .map((article) => ({
          ...article,
          id: state.articleState.articles.find((a) => a.id === article.id).id,
        })),
      articleIDs: state.articleState.articles.map((article) => article.id),
    };
  }

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
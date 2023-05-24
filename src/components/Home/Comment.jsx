import { useState } from "react";
import InputEmoji from "react-input-emoji";
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Comment = (props) => {
  const [text, setText] = useState("");

  const sendComment = () => {
    updateDoc(doc(db, "articles", props.id), {
      comments: [
        {
          name: props.user.displayName,
          photo: props.user.photoURL,
          email: props.user.email,
          text,
        },
        ...props.comments,
      ],
    });
  };

  const deleteComment = async (commentId) => {
    const updatedComments = [...props.comments];
  
    // Find the index of the comment to delete
    const commentIndex = updatedComments.findIndex(
      (comment) => comment.id === commentId && comment.email === props.user.email
    );
  
    if (commentIndex !== -1) {
      updatedComments.splice(commentIndex, 1);
  
      // Update the comments in the database
      await updateDoc(doc(db, "articles", props.id), {
        comments: updatedComments,
      });
    }
  };
  

  const isCurrentUserCommentAuthor = (comment) => {
    return comment.email === props.user.email; // Compare the comment's author email with the current user's email
  };

  return (
    <Container>
      <div className="input">
        <img src={props.photo} alt="user" />
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={sendComment}
          placeholder="Add a comment..."
        />
      </div>
      {props.comments.map((comment, id) => (
        <CommentContainer key={id}>
          <img src={comment?.photo} alt="user" />
          <div className="content">
            <div className="header">
              <div className="info">
                <h6>{comment.name}</h6>
                <span>{comment.email}</span>
              </div>
              {isCurrentUserCommentAuthor(comment) && (
                <button  onClick={() => deleteComment(comment.id)}>
                  <img src="./images/delete.webp" alt=""/>
                </button>
              )}
            </div>
            <p>{comment.text}</p>
          </div>
        </CommentContainer>
      ))}
    </Container>
  );
};
export default Comment;


const Container = styled.div`
  padding: 5px 16px 8px;
  .input {
    display: flex;
    align-items: center;
    padding-bottom: 10npm px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
`;

const CommentContainer = styled.div`
  display: flex;
  padding-top: 15px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right:5px;
  }
  button{
    border:none;
    background-color: #f2f2f2;
  }
  .content {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background-color: #f2f2f2;
    .header {
      display: flex;
      justify-content: space-between;
      .info {
        text-align: start;
        h6 {
          font-size: 14px;
          color: rgba(0, 0, 0, 1);
          font-weight: 600;
        }
        span {
          font-size: 12px;
          display: block;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      img {
        width: 1rem;
        height: fit-content;
      }
    }
    p {
      padding-top: 10px;
      text-align: start;
    }
  }
`;
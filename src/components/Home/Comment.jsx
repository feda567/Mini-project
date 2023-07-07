import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import{
  Container,
  CommentContainer
}from './StyleComment';
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
    const commentIndex = updatedComments.findIndex(
      (comment) => comment.id === commentId && comment.email === props.user.email
    );
  
    if (commentIndex !== -1) {
      updatedComments.splice(commentIndex, 1);
      await updateDoc(doc(db, "articles", props.id), {
        comments: updatedComments,
      });
    }
  };
  
  const isCurrentUserCommentAuthor = (comment) => {
    return comment.email === props.user.email; 
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



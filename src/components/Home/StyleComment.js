import styled from "styled-components";

export const Container = styled.div`
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

export const CommentContainer = styled.div`
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
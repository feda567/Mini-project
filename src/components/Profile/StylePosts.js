import styled from "styled-components";

export const Container = styled.div`
  width: 81.5vw;
  margin: auto;
  background-color:#fff;
`;
export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-family:'Texturina', serif;
  margin-left:8.5vw;
  margin-top:10px;
  margin-bottom:10px;
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1px;
  padding: 5px;
`;

export const Article = styled.div`
  // background-color: #f0f2f5;
  
  overflow: hidden;
  display: ${(props) => (props.img ? "block" : "none")};
`;

export const VideoArticle = styled.div`
  // background-color: #f0f2f5;
  border-radius: 10px;
  overflow: hidden;
  display: ${(props) => (props.vid ? "block" : "none")};
`;

export const SharedImg = styled.div`
  
  // height: 0;
  padding-top: 100%;
  margin:8px;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.3s ease; /* Added transition property */

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0.0, 0.2); /* Added box-shadow on hover */
  }
  
  img {
    OBJECT-FIT:fill;
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    
  }
`;
export const SharedVid = styled.div`
  width: 100%;
  // height: 0;
  // padding-top: 100%;
  position: relative;
  cursor: pointer;
  video{
  border-radius:10px;
  }
  `;

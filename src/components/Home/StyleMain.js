import styled from "styled-components";

export const Container = styled.div`
  grid-area: main;
  width: 100%;
  @media (min-width: 768px) {
    width: 550px;
}
  @media (min-width: 1024px) {
    width: 65vw;
}
`;

export const CommonCard = styled.div`
  text-align:center;
  overflow:hidden;
  margin-bottom:8 px;
  background-color:#fff;
  border-radius:5 px;
  position:relative;
  border:none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

export const ShareBox=styled(CommonCard)`
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
          margin:0 0 0 -2px;
        }
        span,.uploading{
          color:#502780;
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

export const Article=styled(CommonCard)`
  padding:0;
  margin:0 0 8px;
  overflow:visible;
`;

export const SharedActor=styled.div`
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

export const EditModel = styled.ul`
  animation: fadeIn 0.5s;
  text-align: start;
  position: absolute;
  right: 5px;
  top: 55px;
  background-color: white;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%);
  border-radius: 8px;
  overflow: hidden;
  z-index: 99;
  min-width: 250px;
  li {
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    img {
      width: 18px;
      height: 20px;
    }
    h6 {
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
    }
    .info {
      text-align: start;
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

export const Description=styled.div`
  padding:0 16px;
  overflow:hidden;
  color:rgba(0,0,0,.9);
  font-size:24px;
  text-align:left;
  `;

export const SharedImg=styled.div`
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

export const SocialCounts=styled.ul`
  line-height:2.3;
  display:flex;
  align-items:flex-start;
  overflow:auto;
  margin:0 16px;
  padding:8px 0;
  border-bottom:1px solid #e9e5df;
  list-style:none;
  .likes{
    justify-content:flex-start;
    margin-right:5px;
  }

  li{
    display:flex;
    align-items:center;
    margin-right:5px;
    font-size:13px;
    button{
      display:flex;
      border:none;
      background-color:white;
    }
    img{
      width:25px;
      
    }
    .comments{
    cursor:pointer;
    }
  }
`;
export const SocialActions=styled.div`
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
        .liked{
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

export const Content=styled.div`
    text-align:center;
    font-size:50px;
    &>img{
      width:30px;
    }
`;
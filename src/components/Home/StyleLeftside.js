import styled from "styled-components";

export const Container = styled.div`
  grid-area: leftside;  
`;

export const EditModel = styled.ul`
  animation: fadeIn 0.5s;
  text-align: start;
  position: absolute;
  right: 5px;
  top: 135px;
  background-color: white;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%);
  border-radius: 8px;
  overflow: hidden;
  z-index: 99;
  min-width: 180px;
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
  top:170px;
  right:12px;
  background:transparent;
  border:none;
  outline:none;
  padding:.5px;
}
`;

export const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

export const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 14px 14px 10px;
  word-wrap: break-word;
  word-break: break-word;
`;

export const CardBackground = styled.div`
  background: url("/images/16389946_5739877.jpg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

export const Photo = styled.img`
  box-shadow: none;
  
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

export const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

export const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

export const AddInterestForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const InterestButton = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 20px;
  padding: 4px 10px;
  margin: 8px;
  width: 103px; 
  height: 40px;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  box-shadow: 0 0 0 1px #814df0, 0 0 0 3px #fff;
  &:hover {
    background-color: #814df0;
    color: #fff; 
    box-shadow: 0 0 0 2px #814df0, 0 0 0 4px #fff;
  }
`;

export const InterestInput = styled.input`
flex-grow: 1;
padding: 8px;
font-size: 14px;
border: 1px solid #ccc;
border-radius: 20px;
margin-bottom:4px;
margin-left:4px;
`;

export const AddInterestButton = styled.button`
  background-color: #814df0;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin-left: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;

  &:hover {
    background-color: #6339b4;
  }
`;
export const InterestsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;
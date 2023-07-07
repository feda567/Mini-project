import styled from "styled-components";

export const Container = styled.div`

justify-content: center;
align-items: center;
height: 100vh;
`;
export const EditModel = styled.ul`
  animation: fadeIn 0.5s;
  text-align: start;
  position: absolute;
  right: 5px;
  top: 20px;
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
    font-size: 17px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    img {
      width: 18px;
      height: 20px;
    }
  }
`;
export const SharedActor = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 12px 0;
  align-items: center;
  > a {
    img {
      width: 48px;
      height: 48px;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 8px;
    overflow: hidden;
    span {
      text-align: left;
      :first-child {
        font-size: 1px;
        font-weight: 700;
        color: rgba(0, 0, 0, 1);
      }
      :nth-child(n + 1) {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  > button {
    position: absolute;
    top: 0px;
    right: 12px;
  
    background: transparent;
    border: none;
    outline: none;
    padding: 0.5px;
  }
`;
export const ArtCard = styled.div`

  display:flex;
  position:relative;
  width:81.5vw;
  margin-bottom: 50px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  border: none;
  
  `;
  export const Widget = styled.div`

  
  width:81.5vw;
  margin-bottom: 80px;
  margin:auto;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  border: none;  
  
  `;
export const CardBackground = styled.div`
  background: url("/images/16389946_5739877.jpg");
  background-position: center;
  background-size: 462px;
  height: 124px;
  // width: 81.5vw;
  margin: auto;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
export const Photo = styled.img`
  box-shadow: none;
  width: 180px;
  height: 180px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -85px auto 12px 100px;
  border-radius: 50%;
  @media (max-width: 555px) {
    margin: -90px auto 12px 40px;
  }
`;
export const Link = styled.div`
  margin-left: 50px;
  margin-right: 40px;
  width: 900px;
  margin-top: 25px;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  font-size:35px;
  `;
  
  export const InterestsContainer = styled.div`
  margin-top:-3px;
  margin-left:-10px;
`;

  export const InterestButton = styled.button`
  background-color: #fff;
  border: none;
  text-transform: uppercase;
  border-radius: 20px;
  padding: 4px 10px;
  margin: 8px;
  width: 125px;
  height: 40px;
  font-size: 14px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
export const AddInterestForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
export const InterestInput = styled.input`
  flex-grow: 1;
  height: 15px;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;
export const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;
export const AddInterestButton = styled.button`
  background-color: #814df0;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin-left: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  &:hover {
    background-color: #6339b4;
  }
`;
export const AboutText = styled.div`
  color: #000;
  font-size: 18px;
  font-weight: 300;
  margin-top: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

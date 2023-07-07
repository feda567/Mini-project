import styled from "styled-components";

export const Container = styled.div`
  background:#fff;
  margin-left:12px;
  margin-top:10px;
  border-bottom: 1px solid rgba(0.2, 0.2, 0.2, 0.08);
  border-radius: 10px;
  left: 10;
  padding: 0 24px;
  position: relative;
  top: 20;
  width: 94%;
  right:20;
  z-index: 100;
  
`;

export const  Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

export const  Logo = styled.span`
  margin-right: 80px;
  font-size: 0px;
`;

export const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #dce6f1;
      border-radius: 5px;
      color: rgba(0, 0, 0, 0.9);
      width: 70%;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

export const  SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const  Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 1024px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
  .b{
    background-color:white;
    border:none;
    cursor:pointer;
  }
`;

export const  NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

export const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 180px;
    position: relative;
    text-decoration: none;
    cursor:pointer;
    button {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

export const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  @media (max-width: 1024px) {
    position: absolute;
    top: -50px; 
  }
`;

export const User = styled(NavList)`
  a > svg {
    width: 10px;
    border-radius: 50%;
  }
  a > img {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
      cursor:pointer;
    }
  }
  @media (max-width: 1024px) {
    &:hover {
      ${SignOut} {
        align-items: center;
        display: flex;
        justify-content: center;
        cursor: pointer;
        position: absolute;
        top: -50px;
      }
    }
  }
`;


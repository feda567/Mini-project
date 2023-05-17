import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main";
import { Navigate } from "react-router-dom";
import {connect} from "react-redux";


const Home = (props) => {
  return (
    <Container>
      {!props.user && <Navigate to='../'/>}
      <Section>
      </Section>
      <Layout>
        <Leftside />
        <Main />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
`;



const Section = styled.section`
  min-height:20px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 4fr) minmax(0, 9fr) minmax(0, 4fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 12px 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }
`;

const mapStateToProps=(state)=>{
  return{
    user:state.userState.user,
  };
};
export default connect(mapStateToProps)(Home);
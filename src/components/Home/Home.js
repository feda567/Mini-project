import Leftside from "./Leftside";
import Main from "./Main";
import {connect} from "react-redux";
import {
  Container,
  Section,
  Layout
  } from "./StyleHome";


const Home = (props) => {
  return (
    <Container>
      
      <Section>
      </Section>
      <Layout>
        <Leftside />
        <Main />
      </Layout>
    </Container>
  );
};


const mapStateToProps=(state)=>{
  return{
    user:state.userState.user,
  };
};
export default connect(mapStateToProps)(Home);
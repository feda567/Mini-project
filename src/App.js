import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {connect} from 'react-redux';
import { getUserAuth } from './actions';
import Header from "./components/Home/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Msg from "./components/msg.jsx"
import "./App.css";


function App(props) {
  useEffect(()=>{
    props.getUserAuth();
  },[]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={
          <div><Header/><Home/>
          </div>}>
        
            </Route>
            <Route path="/messaging" element={<Msg />} />
        </Routes>
      </Router>
    </div>
  );
}
const mapStateToProps=(state)=>{
  return {};
};

const mapDispatchToProps=(dispatch)=>({
  getUserAuth:()=>dispatch(getUserAuth()),
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
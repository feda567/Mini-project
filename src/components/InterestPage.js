import React, { useState } from "react";
import "./InterestPage.css";
import { useContext } from "react";
import { db } from "../firebase";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function InterestPage() {
  const col1 = ["Programming", "Python", "Java", "Data Science", "DBMS","React"];
  const col2 = ["Cricket", "Football", "Athletics", "Badminton", "Fitness", "Gym","Basketball"];
  const col3 = ["Music", "Dance", "Arts ", "Writing ", "Painting"];
  const col4=  ["Violin","Piano","Guitar","Drums","Trumphets","Accordion"];
  const [othersInput, setOthersInput] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  

  const handleOthersInputChange = (event) => {
    setOthersInput(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    
    console.log(`Checkbox ${id} checked: ${checked}`);
  };


  const handleSubmit = () => {
    const words = othersInput.split(',');
    const trimmedWords = words.map((word) => word.trim());

    console.log(trimmedWords)

    setOthersInput('');

    const atLeastOneChecked = col1.some((val) => document.getElementById(val).checked) ||
      col2.some((val) => document.getElementById(val).checked) ||
      col3.some((val) => document.getElementById(val).checked)||
      col4.some((val) => document.getElementById(val).checked)
      const othersSpecified = othersInput.trim() !== "";

    if (atLeastOneChecked || othersSpecified) {
      const dataToSave = {
        col1: col1.filter((val) => document.getElementById(val).checked),
        col2: col2.filter((val) => document.getElementById(val).checked),
        col3: col3.filter((val) => document.getElementById(val).checked),
        col4: col4.filter((val) => document.getElementById(val).checked),
        others: trimmedWords,
      };

      const userID = currentUser.uid;

      db.collection("users")
        .doc(userID)
        .update({ interests: dataToSave })
        .then(() => {
          console.log("Interests data saved to user's database collection:", dataToSave);
          navigate("/home"); 
        })
        .catch((error) => {
          console.error("Error saving interests data to user's database collection:", error);
        });
    } else {
      alert("Please select at least one interest or specify in 'Others' before submitting.");
    }
  };

  return (
    <div className="">
      <div className="fw-bolder my-3">
        <p className="head fw-bolder">CHOOSE YOUR INTERESTS</p>
      </div>
      <div className="interest-div">
        <div className="inside-div">
          {col1.map((val) => (
            <div className="mx-3 form-check" key={val}>
              <input
                id={val}
                type="checkbox"
                className="form-check-input"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={val} className="form-check-label text-white">
                {val}
              </label>
            </div>
          ))}
        </div>
        <div className="inside-div ">
          {col2.map((val) => (
            <div className="mx-3 form-check" key={val}>
              <input
                id={val}
                type="checkbox"
                className="form-check-input"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={val} className="form-check-label text-white">
                {val}
              </label>
            </div>
          ))}
        </div>
        <div className="inside-div ">
          {col3.map((val) => (
            <div className="mx-3 form-check" key={val}>
              <input
                id={val}
                type="checkbox"
                className="form-check-input"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={val} className="form-check-label text-white">
                {val}
              </label>
            </div>
          ))}
        </div>
        <div className="inside-div ">
          {col4.map((val) => (
            <div className="mx-3 form-check" key={val}>
              <input
                id={val}
                type="checkbox"
                className="form-check-input"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={val} className="form-check-label text-white">
                {val}
              </label>
            </div>
          ))}
        </div>
        <div className="centered-div ">
        <input
          className="others"
          placeholder="Others, specify it...."
          value={othersInput}
          onChange={handleOthersInputChange}
        />
      </div>
      <div className="submit-div">
        <button className="bt-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      </div>
    </div>
  );
}

export default InterestPage;
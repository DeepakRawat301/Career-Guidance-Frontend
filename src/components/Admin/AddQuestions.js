// AddQuestions.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './AddQuestions.css'; // Import the external CSS file

const AddQuestions = () => {
  const navigate = useNavigate();

  const [test, setTest] = useState({
    id: "",
    question: "",
    options: [],
    correctAnswer: "",
    section: "",
  });

  const [optionsString, setOptionsString] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTest({ ...test, [name]: value });
  };

  const handleOptionsChange = (e) => {
    const value = e.target.value;
    setOptionsString(value);
    const optionsArray = value.split(',').map(opt => opt.trim());
    setTest({ ...test, options: optionsArray });
  };

  const reset = (e) => {
    e.preventDefault();
    setTest({
      id: "",
      question: "",
      options: [],
      correctAnswer: "",
      section: "",
    });
    setOptionsString("");
  };

  const saveTest = (e) => {
    e.preventDefault();

    const preparedTest = {
      ...test,
      options: optionsString.split(',').map(opt => opt.trim())
    };

    AdminServices.saveTest(preparedTest)
      .then((response) => {
        console.log("saved", response);
        alert("Question Saved.");
        navigate("/adminDashboard");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Backend responded with error:", error.response);
          alert("Error: " + error.response.data);
        } else if (error.request) {
          console.log("No response received. Request was:", error.request);
          alert("No response from server.");
        } else {
          console.log("Error in setting up request:", error.message);
          alert("Error: " + error.message);
        }
      });
  };

  return (
    <>
      <div className='container'>
        <div className='header'>
          <div className='text'>Add Aptitude Questions</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          <div className='input'>
            <input
              type="text"
              name="id"
              value={test.id}
              onChange={handleChange}
              placeholder='Test ID'
            />
          </div>
          <div className='input'>
            <input
              type="text"
              name="question"
              value={test.question}
              onChange={handleChange}
              placeholder='Question'
            />
          </div>
          <div className='input'>
            <input
              type="text"
              name="options"
              value={optionsString}
              onChange={handleOptionsChange}
              placeholder='Options (comma separated)'
            />
          </div>
          <div className='input'>
            <input
              type="text"
              name="correctAnswer"
              value={test.correctAnswer}
              onChange={handleChange}
              placeholder='Correct Answer'
            />
          </div>
          <div className='input'>
            <input
              type="text"
              name="section"
              value={test.section}
              onChange={handleChange}
              placeholder='Section'
            />
          </div>
        </div>
        <div className='button-container'>
          <button className='submit-button' onClick={saveTest}>Save</button>
          <button className='submit-button' onClick={reset}>Clear</button>
          <button className='submit-button' onClick={() => navigate("/adminDashboard")}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default AddQuestions;
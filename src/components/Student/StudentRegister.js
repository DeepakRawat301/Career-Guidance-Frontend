import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './StudentRegister.css'; // make sure to create this file

const StudentRegister = () => {
  const [student, setStudent] = useState({
    username: '',
    name: '',
    password: '',
    mail: '',
    tenthBoard: '',
    tenthMarks: '',
    twelfthBoard: '',
    twelfthMarks: '',
    twelfthStream: '',
    anyCompExam: '',
    compExamRank: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setStudent({
      username: '',
      name: '',
      password: '',
      mail: '',
      tenthBoard: '',
      tenthMarks: '',
      twelfthBoard: '',
      twelfthMarks: '',
      twelfthStream: '',
      anyCompExam: '',
      compExamRank: '',
    });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    StudentServices.saveStudent(student)
      .then((response) => {
        alert("Details Saved! Verify your Mail.");
        navigate("/studentVerify");
      })
      .catch((error) => {
        if (error.response) {
          alert("Error: " + error.response.data);
        } else if (error.request) {
          alert("No response from server.");
        } else {
          alert("Error: " + error.message);
        }
      });
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Student Registration</h1>

        <input type="text" name="username" value={student.username} onChange={handleChange} placeholder="Username"/>
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name"/>
        <input type="password" name="password" value={student.password} onChange={handleChange} placeholder="Password"/>
        <input type="email" name="mail" value={student.mail} onChange={handleChange} placeholder="Email"/>
        <input type="text" name="tenthBoard" value={student.tenthBoard} onChange={handleChange} placeholder="10th Board"/>
        <input type="text" name="tenthMarks" value={student.tenthMarks} onChange={handleChange} placeholder="10th Marks"/>
        <input type="text" name="twelfthBoard" value={student.twelfthBoard} onChange={handleChange} placeholder="12th Board"/>
        <input type="text" name="twelfthMarks" value={student.twelfthMarks} onChange={handleChange} placeholder="12th Marks"/>
        <input type="text" name="twelfthStream" value={student.twelfthStream} onChange={handleChange} placeholder="12th Stream"/>
        <input type="text" name="anyCompExam" value={student.anyCompExam} onChange={handleChange} placeholder="Any Competition Exam Attempted"/>
        <input type="text" name="compExamRank" value={student.compExamRank} onChange={handleChange} placeholder="Competitive Exam Rank"/>

        <button onClick={saveStudent}>Next</button>
        <div className="text-link" onClick={reset}>Clear</div>
        <div className="text-link" onClick={() => navigate("/studentDashboard")}>Cancel</div>
        <div className="text-link" onClick={() => navigate("/logout")}>Logout</div>
      </div>
    </div>
  );
};

export default StudentRegister;

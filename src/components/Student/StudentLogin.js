import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './StudentLogin.css'; // create this file

const StudentLogin = () => {
  const [student, setStudent] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setStudent({ username: "", password: "" });
  };

  const login = (e) => {
    e.preventDefault();
    StudentServices.login(student)
      .then((response) => {
        alert("Student logged in successfully. Welcome to Student Dashboard");
        navigate("/studentDashboard");
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
        <h1>Student Login</h1>

        <input
          type="text"
          name="username"
          value={student.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={student.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button onClick={login}>Login</button>
        <div className="text-link" onClick={reset}>Clear</div>
        <div className="text-link" onClick={() => navigate("/")}>Cancel</div>
        <div className="text-link" onClick={() => navigate("/addStudent")}>Register as a New Student</div>
      </div>
    </div>
  );
};

export default StudentLogin;

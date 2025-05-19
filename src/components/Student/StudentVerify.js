import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';

const StudentVerify = () => {

    const [student, verifyStudent] = useState({
      username: "",
      otp: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      verifyStudent({ ...student, [name]: value });
    };

    const reset = (e) => {
        e.preventDefault();
        verifyStudent({
          username: "",
          otp: "",
        });
      };
    
      const navigate = useNavigate();

      const verificationTeacher = (e) => {
          e.preventDefault();
          StudentServices.verificationStudent(student)
            .then((response) => {
              console.log("verified", response);
              alert("Verification successful!");
              navigate("/studentLogin");
            })
            .catch((error) => {
              if (error.response) {
                console.log("Backend responded with error:");
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
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
        <div className="container">
        <div className="header">
          <div className="text">Student Verification</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              name="username"
              value={student.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="otp"
              value={student.otp}
              onChange={handleChange}
              placeholder="OTP"
            />
          </div>
        </div>
        <div className="submit">
          <div className="submit">
            <button onClick={verificationTeacher}>Register</button>
          </div>
          <div className="submit">
            <button onClick={reset}>Clear</button>
          </div>
          <div className="submit">
            <button onClick={() => navigate("/studentDashboard")}>Cancel</button>
          </div>
        </div>
      </div>
      <div class="input"><button onClick={() => navigate("/logout")}>Logout</button></div>
    </>
  )
}

export default StudentVerify
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentServices from '../../services/StudentService/StudentServices';

const StudentLogin = () => {

     const[student,setStudent]=useState({
    username:"",
    password:"",
  });

  const handleChange=(e)=>{
    const value=e.target.value;
    setStudent({...student,[e.target.name]:value})
  }

  const reset=(e)=>{
    e.preventDefault();
    setStudent({
    username:"",
    password:"",
    })
  }

  const login=(e)=>{
    e.preventDefault();
    StudentServices.login(student)
    .then((response)=>{
        console.log("logged in",response);
        alert("Student logged in successfully. Welcome to Student Dashboard");
        navigate("/studentDashboard")
    })
    .catch((error)=>{
        if (error.response) {
          console.log("Backend responded with error:");
          console.log("Status:", error.response.status);
          console.log("Data:", error.response.data);     // This contains the actual error message
          alert("Error: " + error.response.data);
        } else if (error.request) {
          console.log("No response received. Request was:", error.request);
          alert("No response from server.");
        } else {
          console.log("Error in setting up request:", error.message);
          alert("Error: " + error.message);
        }
    });
  }

  const navigate = useNavigate();


  return (
    <>
    <div class='container'>
    <div class='header'>
        <div class='text'>Student Login Page</div>
        <div class='underline'></div>
    </div>
    <div class='inputs'>
    <div class='input'>
        <input type="text" name="username" value={student.username} onChange={(e)=>handleChange(e)} placeholder='Username'/>
        </div>
        <div class='input'>
        <input type="password" name="password" value={student.password} onChange={(e)=>handleChange(e)} placeholder='Password'/>
        </div>
    </div>
    <div class='submit'>
        <div class='submit'><button onClick={login}>Login</button></div>
        <div class='submit'><button onClick={reset}>Clear</button></div>
        <div class='submit'><button onClick={()=>navigate("/")}>Cancel</button></div>
        <div class='register'><p>Register as a New Student</p></div>
        <div class='register_admin'><button onClick={()=> navigate("/addStudent")}>Register</button></div>
    </div>
   </div>
    </>
  )
}

export default StudentLogin
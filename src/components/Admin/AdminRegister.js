import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminServices from '../../services/AdminService/AdminServices';

const AdminRegister = () => {

    const[admin,registerAdmin]=useState({
    username:"",
    name:"",
    password:"",
    mail:"",
  });

  const handleChange=(e)=>{
    const value=e.target.value;
    registerAdmin({...admin,[e.target.name]:value})
  }

  const reset=(e)=>{
    e.preventDefault();
    registerAdmin({
    username:"",
    name:"",
    password:"",
    mail:"",
    })
  }

  const saveAdmin=(e)=>{
    e.preventDefault();
    AdminServices.saveAdmin(admin)
    .then((response)=>{
        console.log("saved",response);
        alert("Details Saved! Verify your Mail.");
        navigate("/adminVerify")
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
        <div class='text'>Admin Registration</div>
        <div class='underline'></div>
    </div>
    <div class='inputs'>
        <div class='input'>
        <input type="text" name="username" value={admin.username} onChange={(e)=>handleChange(e)} placeholder='Username'/>
        </div>
        <div class='input'>
        <input type="text" name="name" value={admin.name} onChange={(e)=>handleChange(e)} placeholder='Name'/>
        </div>
        <div class='input'>
        <input type="password" name="password" value={admin.password} onChange={(e)=>handleChange(e)} placeholder='Password'/>
        </div>
        <div class='input'>
        <input type="email" name="mail" value={admin.mail} onChange={(e)=>handleChange(e)} placeholder='Mail'/>
        </div>
        
    </div>
    <div class='submit'>
        <div class='submit'><button onClick={saveAdmin}>Next</button></div>
        <div class='submit'><button onClick={reset}>Clear</button></div>
        <div class='submit'><button onClick={()=>navigate("/")}>Cancel</button></div>
    </div>
   </div>
    </>
  )
}

export default AdminRegister
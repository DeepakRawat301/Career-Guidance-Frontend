import React from 'react'
import { useNavigate } from 'react-router-dom';    

const Navbar = () => {
     const navigate = useNavigate();
  return (
    <>
      <div class='head'>
        <h1 id='first_head'>Welcome to Career Guidance Portal</h1>
        <a id='home_link'>Home</a>
        <button onClick={()=> navigate("/login")}>Admin</button>
        <button onClick={()=> navigate("/studentlogin")}>Student</button>
      </div>
    </>
  )
}

export default Navbar
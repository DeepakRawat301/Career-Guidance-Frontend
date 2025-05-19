import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';

const AdminUpdate = () => {

    const {username}=useParams();
    const navigate = useNavigate();

    const[admin,setAdmin]=useState({
        username:"",
        name:"",
        password:"",
        mail:"",
      });

      const handleChange=(e)=>{
        const value=e.target.value;
        setAdmin({...admin,[e.target.name]:value})
      }

      useEffect(() => {
        const fetchData = async () =>{
         try{
           const response = await AdminServices.getAdminByUsername(username);
           setAdmin(response.data);
         }catch(error) {
           console.log(error);
         }
        };
        fetchData();
   }, [username]);

   const updateAdmin = (e) => {
    e.preventDefault();
    AdminServices.updateAdminByUsername(admin,username)
    .then((response) => {
      console.log("saved", response);
      alert("Data Updated Successfully.");
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
    });
    

    }
  return (
    <>
    <div class='container'>
    <div class='header'>
        <div class='text'>Update Admin</div>
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
        <div class='submit'><button onClick={updateAdmin}>Update</button></div>
        <div class='submit'><button onClick={()=>navigate("/adminDashboard")}>Cancel</button></div>
    </div>
   </div>
   <div class="input"><button onClick={() => navigate("/logout")}>Logout</button></div>
    </>
  )
}

export default AdminUpdate

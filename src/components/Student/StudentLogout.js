import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';


const StudentLogout = () => {

     const navigate = useNavigate();

    useEffect(() => {
      StudentServices.logout()
          .then(response => {
              console.log("Logged out successfully:", response);
              navigate("/landingPage");
          })
          .catch(error => {
              console.error("Error logging out:", error);
              alert("Error logging out.");
          });
  }, []);


  return (
    <></>
  )
}

export default StudentLogout
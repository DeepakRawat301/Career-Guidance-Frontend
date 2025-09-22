import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';


const AdminLogout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      AdminServices.logout()
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

export default AdminLogout
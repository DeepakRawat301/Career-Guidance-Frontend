import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './AdminRegister.css';

const AdminRegister = () => {
  const [admin, registerAdmin] = useState({
    username: "",
    name: "",
    password: "",
    mail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    registerAdmin({ ...admin, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    registerAdmin({
      username: "",
      name: "",
      password: "",
      mail: "",
    });
  };

  const saveAdmin = (e) => {
    e.preventDefault();
    AdminServices.saveAdmin(admin)
      .then((response) => {
        alert("Details Saved! Verify your Mail.");
        navigate("/adminVerify");
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
        <h1>Admin Registration</h1>

        <input
          type="text"
          name="username"
          value={admin.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="name"
          value={admin.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="email"
          name="mail"
          value={admin.mail}
          onChange={handleChange}
          placeholder="Email"
        />

        <button onClick={saveAdmin}>Next</button>
        <div className="text-link" onClick={reset}>Clear</div>
        <div className="text-link" onClick={() => navigate("/")}>Cancel</div>
      </div>
    </div>
  );
};

export default AdminRegister;

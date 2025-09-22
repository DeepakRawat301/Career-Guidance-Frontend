import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './AdminLogin.css';

const AdminLogin = () => {
  const [admin, registerAdmin] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    registerAdmin({ ...admin, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    registerAdmin({ username: '', password: '' });
  };

  const login = (e) => {
    e.preventDefault();
    AdminServices.login(admin)
      .then((response) => {
        alert("Admin logged in successfully. Welcome to Admin Dashboard");
        navigate("/adminDashboard");
      })
      .catch((error) => {
        alert(error.response ? error.response.data : "No response from server");
      });
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Admin Sign In</h1>
        <input
          type="text"
          name="username"
          value={admin.username}
          onChange={handleChange}
          placeholder="Email or username"
        />
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button onClick={login}>Sign In</button>
        <div className="text-link" onClick={reset}>Clear</div>
        <div className="text-link" onClick={() => navigate("/")}>Cancel</div>
        <div className="text-link" onClick={() => navigate("/sAdmin")}>Register as a New Admin</div>
        <div className="small-text">This page is protected to ensure you're not a bot.</div>
      </div>
    </div>
  );
};

export default AdminLogin;

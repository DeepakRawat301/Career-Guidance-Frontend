import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    AdminServices.getLoggedInUsername()
      .then(response => setUsername(response.data))
      .catch(() => alert("Error fetching username!"));
  }, []);

  const handleUpdate = useCallback(() => {
    if (username) {
      navigate(`/updateAdmin/${username}`);
    }
  }, [username, navigate]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      AdminServices.deleteAdminByUsername()
        .then(() => {
          alert("Admin Deleted Successfully.");
          navigate("/login");
        })
        .catch(() => alert("Failed to delete admin. Please try again."));
    }
  };

  return (
    <div className="admin-dashboard-container">

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <span className="welcome-text">Welcome,</span>
          <span className="username-text">{username || "Loading..."}</span>
        </div>
        <h1 className="header-title">Admin Dashboard</h1>
        <div className="header-right">
          <button className="header-btn" onClick={handleUpdate}>Update</button>
          <button className="header-btn delete-btn" onClick={handleDelete}>Delete</button>
          <button className="header-btn" onClick={() => navigate("/logout")}>Logout</button>
        </div>
      </header>

      {/* Body / Panels */}
      <main className="dashboard-main">
        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">Colleges</h2>
            <div className="card-buttons">
              <button className="panel-btn" onClick={() => navigate("/addCollege")}>Add College</button>
              <button className="panel-btn" onClick={() => navigate("/allCollege")}>View All Colleges</button>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h2 className="card-title">Students</h2>
            <div className="card-buttons">
              <button className="panel-btn" onClick={() => navigate("/allStudents")}>View All Students</button>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h2 className="card-title">Questions</h2>
            <div className="card-buttons">
              <button className="panel-btn" onClick={() => navigate("/addQuestions")}>Add Questions</button>
              <button className="panel-btn" onClick={() => navigate("/allQuestions")}>View All Questions</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        &copy; 2025 Career Guidance System. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;
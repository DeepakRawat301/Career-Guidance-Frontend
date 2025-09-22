import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [college, setCollege] = useState({ search: '' });
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch logged-in username
  useEffect(() => {
    StudentServices.getLoggedInUsername()
      .then((response) => {
        const fetchedUsername = response.data;
        setUsername(fetchedUsername);
        localStorage.setItem('username', fetchedUsername);
      })
      .catch((error) => {
        console.error('Error fetching username:', error);
        alert('Error fetching username!');
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setCollege({ ...college, [e.target.name]: value });
  };

  const update = useCallback(
    (e) => {
      e.preventDefault();
      if (username) navigate(`/editStudent/${username}`);
    },
    [username, navigate]
  );

  const studentdelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      StudentServices.deleteStudentByUsername()
        .then((response) => {
          console.log('deleted', response);
          alert('Student Deleted Successfully.');
          navigate('/studentlogin');
        })
        .catch((error) => {
          console.log(error);
          alert('Failed to delete student');
        });
    }
  };

  const searchCollege = (e) => {
    e.preventDefault();
    if (!college.search.trim()) {
      alert('Please enter a keyword to search.');
      return;
    }

    setLoading(true);

    StudentServices.searchCollegeBy(college.search)
      .then((response) => {
        setColleges(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log('Backend responded with error:', error.response);
          alert('Error: ' + error.response.data);
        } else if (error.request) {
          console.log('No response received. Request was:', error.request);
          alert('No response from server.');
        } else {
          console.log('Error in setting up request:', error.message);
          alert('Error: ' + error.message);
        }
      });
  };

  return (
    <div className="student-dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {username || 'Loading...'}</h1> <h1 className="header-title">Student Dashboard</h1>
        </div>
        <div className="header-right">
          <button className="btn-secondary" onClick={update}>Update Profile</button>
          <button className="btn-danger" onClick={studentdelete}>Delete Account</button>
          <button className="btn-primary" onClick={() => navigate('/studentLogout')}>Logout</button>
        </div>
      </header>

      {/* Main Body */}
      <main className="dashboard-body">
        {/* Search Panel */}
        <div className="dashboard-panel panel-search">
          <h2>Find Your Dream College</h2>
          <form onSubmit={searchCollege} className="search-form">
            <input
              type="text"
              name="search"
              value={college.search}
              onChange={handleChange}
              placeholder="Search by name, location, or keyword..."
            />
            <button type="submit" className="btn-primary">Search Colleges</button>
          </form>
        </div>

        {/* Action Panels */}
        <div className="lower-panels">
          <div className="dashboard-panel panel-action">
            <h3>Aptitude Test</h3>
            <p>Assess your skills and interests to find the best career path for you.</p>
            <button className="btn-secondary" onClick={() => navigate('/giveTest')}>Attempt Test</button>
          </div>

          <div className="dashboard-panel panel-action">
            <h3>Check Eligibility</h3>
            <p>See which colleges you're eligible for based on your test scores and profile.</p>
            <button className="btn-secondary" onClick={() => navigate('/checkEligibility')}>Check Eligibility</button>
          </div>
        </div>

        {/* Table of Colleges */}
        {loading && <p className="loading-message">Loading colleges...</p>}

        {colleges.length > 0 && (
          <div className="dashboard-panel panel-table">
            <h3>Search Results</h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Ranking</th>
                    <th>Accreditation</th>
                    <th>Eligibility</th>
                    <th>Courses & Fees</th>
                    <th>Facilities</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.map((college) => (
                    <tr key={college.id}>
                      <td>{college.name}</td>
                      <td>{college.location}</td>
                      <td>{college.ranking}</td>
                      <td>{college.accreditation?.join(', ') || 'N/A'}</td>
                      <td>
                        {college.eligibilityCriteria?.length > 0 ? (
                          college.eligibilityCriteria.map((item, i) => (
                            <div key={i}>
                              <strong>{item.examName}:</strong> Min Score {item.minScore}
                            </div>
                          ))
                        ) : 'N/A'}
                      </td>
                      <td>
                        {college.coursesOfferedWithFees?.length > 0 ? (
                          college.coursesOfferedWithFees.map((course, i) => (
                            <div key={i}>
                              <strong>{course.courseName}:</strong> ₹{course.tuitionFee}
                            </div>
                          ))
                        ) : 'N/A'}
                      </td>
                      <td>{college.facilities?.join(', ') || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {colleges.length === 0 && !loading && college.search.trim() && (
          <p className="no-results-message">No colleges found matching your search. Try a different keyword!</p>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 Career Guidance System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;
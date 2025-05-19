import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';

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
          console.log('Backend responded with error:');
          console.log('Status:', error.response.status);
          console.log('Data:', error.response.data);
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
    <>
      <div className="container">
        <div className="head">
          <h1 className="user">Welcome Student, {username ? username : 'Loading...'}</h1>
        </div>
      </div>

      <div className="adminwork">
        <div className="input">
          <button onClick={(e) => update(e)}>Update</button>
        </div>
        <div className="input">
          <button onClick={(e) => studentdelete(e)}>Delete</button>
        </div>
        <div className="input">
          <button onClick={() => navigate('/studentLogout')}>Logout</button>
        </div>
      </div>

      <div className="search">
        <input
          type="text"
          name="search"
          value={college.search}
          onChange={handleChange}
          placeholder="Search Colleges"
        />
        <button onClick={searchCollege}>Search</button>
      </div>

      <div className="panel">
        <a onClick={() => navigate('/giveTest')}>Attempt Attitude Test</a>
      </div>

      <div className="panel">
        <h2>Attempt Aptitude Test to Get Eligible Colleges</h2>
        <a onClick={() => navigate('/checkEligibility')}>Get Eligible College</a>
      </div>

      {loading && <p>Loading colleges...</p>}

      {colleges.length > 0 && (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Ranking</th>
                <th>Accreditation</th>
                <th>Eligibility Criteria</th>
                <th>Courses Offered With Fees</th>
                <th>Facilities</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((college) => (
                <tr key={college.id}>
                  <td>{college.id}</td>
                  <td>{college.name}</td>
                  <td>{college.location}</td>
                  <td>{college.ranking}</td>
                  <td>{college.accreditation?.join(', ')}</td>
                  <td>
                    {college.eligibilityCriteria?.map((item, i) => (
                      <div key={i}>
                        {item.examName} - {item.minScore} - {item.subjectStream}
                      </div>
                    ))}
                  </td>
                  <td>
                    {college.coursesOfferedWithFees?.map((course, i) => (
                      <div key={i}>
                        {course.courseName}: ₹{course.tuitionFee}
                      </div>
                    ))}
                  </td>
                  <td>{college.facilities?.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default StudentDashboard;

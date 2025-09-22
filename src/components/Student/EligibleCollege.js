import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import StudentServices from '../../services/StudentService/StudentServices';
import './EligibleCollege.css';

const EligibleCollege = () => {
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMessage('');
      try {
        const response = await StudentServices.getEligibleCollege();
        if (response.data && response.data.length > 0) {
          setColleges(response.data);
        } else {
          setMessage("No colleges match your eligibility criteria.");
          setColleges([]);
        }
      } catch (error) {
        console.error("Failed to fetch eligible colleges:", error);
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data);
        } else {
          setMessage("An unexpected error occurred while fetching colleges.");
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="eligible-college-container">
      <div className="header">
        <h1>Eligible Colleges</h1>
        <p>Here are the colleges you are eligible for based on your aptitude and scores.</p>
      </div>

      {loading && <p>Loading colleges...</p>}

      {!loading && colleges.length === 0 && message && (
        <div className="no-college-message">{message}</div>
      )}

      {!loading && colleges.length > 0 && (
        <div className="college-cards">
          {colleges.map((college) => (
            <div className="college-card" key={college.id}>
              <h2>{college.name}</h2>
              <p><strong>Location:</strong> {college.location}</p>
              <p><strong>Ranking:</strong> {college.ranking}</p>
              <p><strong>Accreditation:</strong> {college.accreditation?.join(', ')}</p>
              <div className="eligibility">
                <strong>Eligibility Criteria:</strong>
                {college.eligibilityCriteria?.map((item, i) => (
                  <div key={i} className="criteria">
                    {item.examName} - {item.minScore} - {item.subjectStream}
                  </div>
                ))}
              </div>
              <div className="courses">
                <strong>Courses With Fees:</strong>
                {college.coursesOfferedWithFees?.map((course, i) => (
                  <div key={i}>
                    {course.courseName}: ₹{course.tuitionFee}
                  </div>
                ))}
              </div>
              <p><strong>Facilities:</strong> {college.facilities?.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EligibleCollege;

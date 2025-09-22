import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import StudentServices from '../../services/StudentService/StudentServices';
import './AttemptTest.css';

const AttemptTest = () => {
  const [loading, setLoading] = useState(true);
  const [tests, setTest] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logged-in username
    StudentServices.getLoggedInUsername()
      .then(response => setUsername(response.data))
      .catch(() => console.log("Username fetch error"));

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await StudentServices.getTest();
        setTest(response.data || []);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const submitTest = async (e) => {
    e.preventDefault();

    const submissionData = Object.keys(selectedAnswers).map(questionId => ({
      questionId: questionId,
      selectedOption: selectedAnswers[questionId]
    }));

    try {
      await StudentServices.submitTest(submissionData, username);
      alert("Test submitted successfully!");
      navigate('/studentDashboard');
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Test submission failed.");
    }
  };

  return (
    <div className="attempt-test-container">
      {/* Header */}
      <div className="header">
        <h1>Aptitude Test</h1>
        <p>Select the correct option for each question below.</p>
      </div>

      {/* Questions */}
      {!loading ? (
        <div className="questions-panel">
          {tests.map((test) => (
            <div className="question-card" key={test.id}>
              <div className="question-text">
                {test.question} <span className="section-label">[{test.section}]</span>
              </div>
              <div className="options">
                {test.options.map((option, idx) => (
                  <label key={idx} className="option-label">
                    <input
                      type="radio"
                      name={`question-${test.id}`}
                      value={option}
                      checked={selectedAnswers[test.id] === option}
                      onChange={() => handleOptionChange(test.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

      {/* Buttons */}
      <div className="test-actions">
        <button className="submit-btn" onClick={submitTest}>Submit Test</button>
        <button className="cancel-btn" onClick={() => navigate('/studentDashboard')}>Cancel</button>
      </div>
    </div>
  );
};

export default AttemptTest;

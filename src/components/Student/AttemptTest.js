import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import StudentServices from '../../services/StudentService/StudentServices';

const AttemptTest = () => {
  const [loading, setLoading] = useState(true);
  const [tests, setTest] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 
  const [username, setUsername] = useState(''); // Replace with session logic later
  const navigate = useNavigate();

  useEffect(() => {
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
      const response = await StudentServices.submitTest(submissionData, username);
      console.log(response.data);
      alert("Test submitted successfully!");
      navigate('/studentDashboard');
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Test submission failed.");
    }
  };

  return (
    <>
      <div className='teacherlist'>
        <h2>Aptitude Test Questions</h2>
      </div>

      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Section</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {tests.map((test) => (
                <tr key={test.id}>
                  <td>{test.question}</td>
                  <td>
                    {test.options.map((option, idx) => (
                      <div key={idx}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${test.id}`}
                            value={option}
                            checked={selectedAnswers[test.id] === option}
                            onChange={() => handleOptionChange(test.id, option)}
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                  </td>
                  <td>{test.section}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="adminwork">
        <div className="input">
          <button onClick={submitTest}>Submit Test</button>
        </div>
      </div>
    </>
  );
};

export default AttemptTest;

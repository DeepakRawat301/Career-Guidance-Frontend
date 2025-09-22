import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './QuestionsList.css'; // Import the external CSS file

const QuestionsList = () => {
    const [loading, setLoading] = useState(true);
    const [tests, setTest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await AdminServices.getTest();
                setTest(response.data || []);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteQuestion = (e, id) => {
        e.preventDefault();
        AdminServices.deleteQuestionById(id)
            .then(() => {
                if (tests) {
                    setTest((prevElement) => {
                        return prevElement.filter((test) => test.id !== id);
                    });
                }
            });
    };

    const editQuestion = (e, id) => {
        e.preventDefault();
        navigate(`/editQuestion/${id}`);
    };

    return (
        <div className="list-container">
            <h2 className="list-heading">All Questions Details</h2>

            <div className="table-wrapper">
                <table className="questions-table">
                    <thead>
                        <tr>
                            <th>Question ID</th>
                            <th>Question</th>
                            <th>Options</th>
                            <th>Correct Answer</th>
                            <th>Section</th>
                            <th className="action-column">Actions</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                            {tests.map((test) => (
                                <tr key={test.id}>
                                    <td>{test.id}</td>
                                    <td>{test.question}</td>
                                    <td>{test.options.join(', ')}</td>
                                    <td>{test.correctAnswer}</td>
                                    <td>{test.section}</td>
                                    <td className="action-buttons">
                                        <button className="edit-btn" onClick={(e) => editQuestion(e, test.id)}>Edit</button>
                                        <button className="delete-btn" onClick={(e) => deleteQuestion(e, test.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default QuestionsList;
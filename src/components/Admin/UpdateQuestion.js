import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';

const UpdateQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [test, setTest] = useState({
        id: "",
        question: "",
        options: [],
        correctAnswer: "",
        section: "",
    });

    const [optionsString, setOptionsString] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setTest({ ...test, [e.target.name]: value });
    };

    const handleOptionsChange = (e) => {
        const value = e.target.value;
        setOptionsString(value);
        const optionsArray = value.split(',').map(opt => opt.trim());
        setTest({ ...test, options: optionsArray });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AdminServices.getQuestionById(id);
                setTest(response.data);
                setOptionsString(response.data.options.join(', '));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const updateQuestion = (e) => {
        e.preventDefault();

        const updatedTest = {
            ...test,
            options: optionsString.split(',').map(opt => opt.trim())
        };

        AdminServices.updateQuestionById(updatedTest, test.id)
            .then((response) => {
                console.log("saved", response);
                alert("Question Updated Successfully.");
                navigate("/allQuestions");
            })
            .catch((error) => {
                console.log(error);
                alert("Update failed. Please check the data and try again.");
            });
    };

    return (
        <>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Update Aptitude Questions</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input
                            type="text"
                            name="id"
                            value={test.id}
                            onChange={handleChange}
                            placeholder='Test ID'
                        />
                    </div>
                    <div className='input'>
                        <input
                            type="text"
                            name="question"
                            value={test.question}
                            onChange={handleChange}
                            placeholder='Question'
                        />
                    </div>
                    <div className='input'>
                        <input
                            type="text"
                            name="options"
                            value={optionsString}
                            onChange={handleOptionsChange}
                            placeholder='Options (comma separated)'
                        />
                    </div>
                    <div className='input'>
                        <input
                            type="text"
                            name="correctAnswer"
                            value={test.correctAnswer}
                            onChange={handleChange}
                            placeholder='Correct Answer'
                        />
                    </div>
                    <div className='input'>
                        <input
                            type="text"
                            name="section"
                            value={test.section}
                            onChange={handleChange}
                            placeholder='Section'
                        />
                    </div>
                </div>
                <div className='submit'>
                    <div className='submit'>
                        <button onClick={updateQuestion}>Update</button>
                    </div>
                    <div className='submit'>
                        <button onClick={() => navigate("/adminDashboard")}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateQuestion;

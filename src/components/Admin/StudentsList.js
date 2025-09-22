import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './StudentsList.css';

const StudentsList = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await AdminServices.getStudents();
                setStudents(response.data || []);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="students-container">
            <h2>All Students Details</h2>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>10th Board</th>
                            <th>10th Marks</th>
                            <th>12th Board</th>
                            <th>12th Marks</th>
                            <th>12th Stream</th>
                            <th>Any Competition Exam</th>
                            <th>Competitive Exam Rank</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.username}>
                                    <td>{student.username}</td>
                                    <td>{student.name}</td>
                                    <td>{student.mail}</td>
                                    <td>{student.tenthBoard}</td>
                                    <td>{student.tenthMarks}</td>
                                    <td>{student.twelfthBoard}</td>
                                    <td>{student.twelfthMarks}</td>
                                    <td>{student.twelfthStream}</td>
                                    <td>{student.anyCompExam}</td>
                                    <td>{student.compExamRank}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            <div>
                <button className="action-buttons , edit-btn" onClick={() => navigate("/adminDashboard")}>Back</button>
            </div>
        </div>
    );
};

export default StudentsList;

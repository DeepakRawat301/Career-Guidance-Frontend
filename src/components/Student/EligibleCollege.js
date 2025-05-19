import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import StudentServices from '../../services/StudentService/StudentServices';

const EligibleCollege = () => {
    const [loading, setLoading] = useState(true);
    const [colleges, setCollege] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setMessage('');
            try {
                const response = await StudentServices.getEligibleCollege();
                if (response.data && response.data.length > 0) {
                    setCollege(response.data);
                } else {
                    setMessage("No colleges match your eligibility criteria.");
                    setCollege([]);
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
        <>
            <div className="teacherlist">
                <h2>All Colleges Details</h2>
            </div>

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

                    {!loading && colleges.length > 0 && (
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
                    )}

                    {!loading && colleges.length === 0 && message && (
                        <tbody>
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                                    {message}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default EligibleCollege;

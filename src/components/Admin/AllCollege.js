import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import AdminServices from '../../services/AdminService/AdminServices';
import './AllCollege.css'; // create this file

const AllCollege = () => {
    const [loading, setLoading] = useState(true);
    const [colleges,setCollege] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try{
                const response = await AdminServices.getColleges();
                setCollege(response.data || []);
            }catch(error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteCollege = (e, id) => {
        e.preventDefault();
        AdminServices.deleteCollegeById(id)
              .then(() => {
                alert("College Data Deleted Successfully.");
                setCollege(prev => prev.filter(college => college.id !== id));
              })
    };

    const editCollege = (e,id) => {
        e.preventDefault();
        navigate(`/editCollege/${id}`)
    };

    return (
        <div className="allcollege-container">
            <h2>All Colleges Details</h2>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Ranking</th>
                            <th>Accreditation</th>
                            <th>Eligibility Criteria</th>
                            <th>Courses Offered</th>
                            <th>Facilities</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {!loading && (
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
                                    <td className="action-buttons">
                                        <button className="edit-btn" onClick={(e) => editCollege(e, college.id)}>Edit</button>
                                        <button className="delete-btn" onClick={(e) => deleteCollege(e, college.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            <div>
                <button className="edit-btn" onClick={() => navigate("/adminDashboard")}>Back</button>
            </div>
        </div>
        
    );
};

export default AllCollege;

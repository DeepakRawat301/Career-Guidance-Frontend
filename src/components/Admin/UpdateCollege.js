import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './UpdateCollege.css';

const UpdateCollege = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [college, setCollege] = useState({
        id: '',
        name: '',
        location: '',
        ranking: '',
        accreditation: [''],
        eligibilityCriteria: [{ examName: '', minScore: '', subjectStream: '' }],
        coursesOfferedWithFees: [{ courseName: '', tuitionFee: '' }],
        facilities: ['']
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AdminServices.getCollegeById(id);
                setCollege(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const updateCollege = (e) => {
        e.preventDefault();
        AdminServices.updateCollegeById(college, college.id)
            .then(() => {
                alert("College Updated Successfully.");
                navigate("/allCollege");
            })
            .catch((error) => {
                console.log(error);
                alert("Update failed. Please check the data and try again.");
            });
    };

    return (
        <div className="update-college-container">
            <div className="update-college-header">
                <h2>Update College Details</h2>
                <div className="underline"></div>
            </div>

            <div className="input-group">
                <input type="text" placeholder="College ID" value={college.id} onChange={(e) => setCollege({ ...college, id: e.target.value })} />
                <input type="text" placeholder="College Name" value={college.name} onChange={(e) => setCollege({ ...college, name: e.target.value })} />
                <input type="text" placeholder="Location" value={college.location} onChange={(e) => setCollege({ ...college, location: e.target.value })} />
                <input type="number" placeholder="Ranking" value={college.ranking} onChange={(e) => setCollege({ ...college, ranking: e.target.value })} />
            </div>

            <label>Accreditations:</label>
            {college.accreditation.map((acc, idx) => (
                <input key={idx} placeholder={`Accreditation ${idx + 1}`} value={acc}
                    onChange={(e) => {
                        const updated = [...college.accreditation];
                        updated[idx] = e.target.value;
                        setCollege({ ...college, accreditation: updated });
                    }}
                />
            ))}
            <button type="button" className="add-btn" onClick={() => setCollege({ ...college, accreditation: [...college.accreditation, ""] })}>
                Add Accreditation
            </button>

            <label>Eligibility Criteria:</label>
            {college.eligibilityCriteria.map((item, idx) => (
                <div key={idx} className="flex-row">
                    <input placeholder="Exam Name" value={item.examName}
                        onChange={(e) => {
                            const updated = [...college.eligibilityCriteria];
                            updated[idx].examName = e.target.value;
                            setCollege({ ...college, eligibilityCriteria: updated });
                        }}
                    />
                    <input placeholder="Min Score" value={item.minScore}
                        onChange={(e) => {
                            const updated = [...college.eligibilityCriteria];
                            updated[idx].minScore = e.target.value;
                            setCollege({ ...college, eligibilityCriteria: updated });
                        }}
                    />
                    <input placeholder="Subject Stream" value={item.subjectStream}
                        onChange={(e) => {
                            const updated = [...college.eligibilityCriteria];
                            updated[idx].subjectStream = e.target.value;
                            setCollege({ ...college, eligibilityCriteria: updated });
                        }}
                    />
                </div>
            ))}
            <button type="button" className="add-btn" onClick={() => setCollege({
                ...college,
                eligibilityCriteria: [...college.eligibilityCriteria, { examName: "", minScore: "", subjectStream: "" }]
            })}>
                Add Eligibility
            </button>

            <label>Courses Offered with Fees:</label>
            {college.coursesOfferedWithFees.map((course, idx) => (
                <div key={idx} className="flex-row">
                    <input placeholder="Course Name" value={course.courseName}
                        onChange={(e) => {
                            const updated = [...college.coursesOfferedWithFees];
                            updated[idx].courseName = e.target.value;
                            setCollege({ ...college, coursesOfferedWithFees: updated });
                        }}
                    />
                    <input type="number" placeholder="Tuition Fee" value={course.tuitionFee}
                        onChange={(e) => {
                            const updated = [...college.coursesOfferedWithFees];
                            updated[idx].tuitionFee = e.target.value;
                            setCollege({ ...college, coursesOfferedWithFees: updated });
                        }}
                    />
                </div>
            ))}
            <button type="button" className="add-btn" onClick={() => setCollege({
                ...college,
                coursesOfferedWithFees: [...college.coursesOfferedWithFees, { courseName: "", tuitionFee: "" }]
            })}>
                Add Course
            </button>

            <label>Facilities:</label>
            {college.facilities.map((fac, idx) => (
                <input key={idx} placeholder={`Facility ${idx + 1}`} value={fac}
                    onChange={(e) => {
                        const updated = [...college.facilities];
                        updated[idx] = e.target.value;
                        setCollege({ ...college, facilities: updated });
                    }}
                />
            ))}
            <button type="button" className="add-btn" onClick={() => setCollege({ ...college, facilities: [...college.facilities, ""] })}>
                Add Facility
            </button>

            <div className="submit-buttons">
                <button onClick={updateCollege}>Update</button>
                <button onClick={() => navigate("/allCollege")}>Cancel</button>
            </div>
        </div>
    );
};

export default UpdateCollege;

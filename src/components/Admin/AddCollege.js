import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './AddCollege.css'; // Import the CSS file

const AddCollege = () => {
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

  const reset = (e) => {
    e.preventDefault();
    setCollege({
      id: '',
      name: '',
      location: '',
      ranking: '',
      accreditation: [''],
      eligibilityCriteria: [{ examName: '', minScore: '', subjectStream: '' }],
      coursesOfferedWithFees: [{ courseName: '', tuitionFee: '' }],
      facilities: ['']
    });
  };

  const saveCollege = (e) => {
    e.preventDefault();
    AdminServices.saveCollege(college)
      .then((response) => {
        console.log("saved", response);
        alert("College Details Saved.");
        navigate("/adminDashboard");
      })
      .catch((error) => {
        if (error.response) {
          alert("Error: " + error.response.data);
        } else if (error.request) {
          alert("No response from server.");
        } else {
          alert("Error: " + error.message);
        }
      });
  };

  return (
    <div className="college-container">
      <h2>Add College Details</h2>

      {/* ==== Basic Details ==== */}
      <h3>Basic Details</h3>
      <div className="basic-details">
        <input type="text" placeholder="College ID" value={college.id} 
          onChange={(e) => setCollege({ ...college, id: e.target.value })} />
        <input type="text" placeholder="College Name" value={college.name} 
          onChange={(e) => setCollege({ ...college, name: e.target.value })} />
        <input type="text" placeholder="Location" value={college.location} 
          onChange={(e) => setCollege({ ...college, location: e.target.value })} />
        <input type="number" placeholder="Ranking" value={college.ranking} 
          onChange={(e) => setCollege({ ...college, ranking: e.target.value })} />
      </div>

      {/* ==== Accreditations ==== */}
      <h3>Accreditations</h3>
      {college.accreditation.map((acc, idx) => (
        <div key={idx} className="inline-group">
          <input placeholder={`Accreditation ${idx + 1}`} value={acc}
            onChange={(e) => {
              const updated = [...college.accreditation];
              updated[idx] = e.target.value;
              setCollege({ ...college, accreditation: updated });
            }} />
        </div>
      ))}
      <button type="button" onClick={() => setCollege({ ...college, accreditation: [...college.accreditation, ""] })}>
        Add Accreditation
      </button>

      {/* ==== Eligibility Criteria ==== */}
      <h3>Eligibility Criteria</h3>
      {college.eligibilityCriteria.map((item, idx) => (
        <div key={idx} className="inline-group">
          <input placeholder="Exam Name" value={item.examName}
            onChange={(e) => {
              const updated = [...college.eligibilityCriteria];
              updated[idx].examName = e.target.value;
              setCollege({ ...college, eligibilityCriteria: updated });
            }} />
          <input placeholder="Min Score" value={item.minScore}
            onChange={(e) => {
              const updated = [...college.eligibilityCriteria];
              updated[idx].minScore = e.target.value;
              setCollege({ ...college, eligibilityCriteria: updated });
            }} />
          <input placeholder="Subject Stream" value={item.subjectStream}
            onChange={(e) => {
              const updated = [...college.eligibilityCriteria];
              updated[idx].subjectStream = e.target.value;
              setCollege({ ...college, eligibilityCriteria: updated });
            }} />
        </div>
      ))}
      <button type="button" onClick={() => setCollege({
        ...college,
        eligibilityCriteria: [...college.eligibilityCriteria, { examName: "", minScore: "", subjectStream: "" }]
      })}>
        Add Eligibility
      </button>

      {/* ==== Courses Offered ==== */}
      <h3>Courses Offered with Fees</h3>
      {college.coursesOfferedWithFees.map((course, idx) => (
        <div key={idx} className="inline-group">
          <input placeholder="Course Name" value={course.courseName}
            onChange={(e) => {
              const updated = [...college.coursesOfferedWithFees];
              updated[idx].courseName = e.target.value;
              setCollege({ ...college, coursesOfferedWithFees: updated });
            }} />
          <input type="number" placeholder="Tuition Fee" value={course.tuitionFee}
            onChange={(e) => {
              const updated = [...college.coursesOfferedWithFees];
              updated[idx].tuitionFee = e.target.value;
              setCollege({ ...college, coursesOfferedWithFees: updated });
            }} />
        </div>
      ))}
      <button type="button" onClick={() => setCollege({
        ...college,
        coursesOfferedWithFees: [...college.coursesOfferedWithFees, { courseName: "", tuitionFee: "" }]
      })}>
        Add Course
      </button>

      {/* ==== Facilities ==== */}
      <h3>Facilities</h3>
      {college.facilities.map((fac, idx) => (
        <div key={idx} className="inline-group">
          <input placeholder={`Facility ${idx + 1}`} value={fac}
            onChange={(e) => {
              const updated = [...college.facilities];
              updated[idx] = e.target.value;
              setCollege({ ...college, facilities: updated });
            }} />
        </div>
      ))}
      <button type="button" onClick={() => setCollege({ ...college, facilities: [...college.facilities, ""] })}>
        Add Facility
      </button>

      {/* ==== Submit Buttons ==== */}
      <div className="submit">
        <button onClick={saveCollege}>Add</button>
        <button onClick={reset}>Clear</button>
        <button className="remove-btn" onClick={() => navigate("/adminDashboard")}>Cancel</button>
      </div>
    </div>
  );
};

export default AddCollege;

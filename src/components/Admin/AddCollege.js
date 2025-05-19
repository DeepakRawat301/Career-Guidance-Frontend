import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';

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

  const handleChange = (e) => {
    const value = e.target.value;
    setCollege({ ...college, [e.target.name]: value });
  };

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
          console.log("Backend responded with error:", error.response);
          alert("Error: " + error.response.data);
        } else if (error.request) {
          console.log("No response received:", error.request);
          alert("No response from server.");
        } else {
          console.log("Error setting up request:", error.message);
          alert("Error: " + error.message);
        }
      });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Add College Details</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <input type="text" placeholder="College ID" value={college.id} onChange={(e) => setCollege({ ...college, id: e.target.value })} />
        <input type="text" placeholder="College Name" value={college.name} onChange={(e) => setCollege({ ...college, name: e.target.value })} />
        <input type="text" placeholder="Location" value={college.location} onChange={(e) => setCollege({ ...college, location: e.target.value })} />
        <input type="number" placeholder="Ranking" value={college.ranking} onChange={(e) => setCollege({ ...college, ranking: e.target.value })} />

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
        <button type="button" onClick={() => setCollege({ ...college, accreditation: [...college.accreditation, ""] })}>
          Add Accreditation
        </button>

        <label>Eligibility Criteria:</label>
        {college.eligibilityCriteria.map((item, idx) => (
          <div key={idx}>
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
        <button type="button" onClick={() => setCollege({
          ...college,
          eligibilityCriteria: [...college.eligibilityCriteria, { examName: "", minScore: "", subjectStream: "" }]
        })}>
          Add Eligibility
        </button>

        <label>Courses Offered with Fees:</label>
        {college.coursesOfferedWithFees.map((course, idx) => (
          <div key={idx}>
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
        <button type="button" onClick={() => setCollege({
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
        <button type="button" onClick={() => setCollege({ ...college, facilities: [...college.facilities, ""] })}>
          Add Facility
        </button>
      </div>

      <div className="submit">
        <button onClick={saveCollege}>Add</button>
        <button onClick={reset}>Clear</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
};

export default AddCollege;

import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import AdminServices from '../../services/AdminService/AdminServices';

const AllCollege = () => {

    const [loading, setLoading] = useState(true);
    const [colleges,setCollege] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchData = async () =>{
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
               if(colleges){
                setCollege((prevElement) => {
                  alert("College Data Deleted Successfully.");
                 return  prevElement.filter((college) => college.id !== id);
                 
                })
               }
              })
    };

    const editCollege = (e,id) => {
        e.preventDefault();
        navigate(`/editCollege/${id}`)
    };

    
  return (
    <>
    <div class='teacherlist'>
      <h2>All Colleges Details</h2>
    </div>

    <div class='table'>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Ranking</th>
          <th>Accredition</th>
          <th>Eligibility Criteria</th>
          <th>Courses Offered With Fees</th>
          <th>Facilities</th>
          </tr>
        </thead>
        {!loading && (
        <tbody>
         {colleges.map((college)=>(
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

          <td>
          <button onClick={(e) => editCollege(e, college.id)}>Edit</button>
          <button onClick={(e) => deleteCollege(e, college.id)}>Delete</button>
         </td>

          </tr>
        ))}
        </tbody>
        )}
      </table>
    </div>
    </>
  )
}

export default AllCollege
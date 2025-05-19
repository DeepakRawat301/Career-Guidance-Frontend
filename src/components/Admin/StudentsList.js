import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import AdminServices from '../../services/AdminService/AdminServices';

const StudentsList = () => {

    const [loading, setLoading] = useState(true);
    const [students,setStudent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchData = async () =>{
             setLoading(true);
             try{
               const response = await AdminServices.getStudents();
               setStudent(response.data || []);
             }catch(error) {
               console.log(error);
             }
             setLoading(false);
            };
            fetchData();
       }, []);
    

  return (
    <>
    <div class='teacherlist'>
      <h2>All Students Details</h2>
    </div>

    <div class='table'>
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
          <th>Any Competition Exam Attempted</th>
          <th>Competitive Exam Rank</th>
          </tr>
        </thead>
        {!loading && (
        <tbody>
         {students.map((student)=>(
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
    </>
  )
}

export default StudentsList
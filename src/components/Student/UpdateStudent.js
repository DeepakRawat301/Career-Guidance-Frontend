import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';


const UpdateStudent = () => {

const {username}=useParams();
const navigate = useNavigate();

const[student,setStudent]=useState({
          username: '',
          name: '',
          password: '',
          mail: '',
          tenthBoard: '',
          tenthMarks: '',
          twelfthBoard: '',
          twelfthMarks: '',
          twelfthStream: '',
          anyCompExam: '',
          compExamRank: '',
    });

    const [subjectsString, setSubjectsString] = useState("");

    const handleChange=(e)=>{
        const value=e.target.value;
        setStudent({...student,[e.target.name]:value})
        }

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await StudentServices.getStudentByUsername(username);
                    setStudent(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }, [username]);


    const updateStudent = (e) => {
            e.preventDefault();   
            StudentServices.updateStudentByUsername(student,username)
                .then((response) => {
                    console.log("saved", response);
                    alert("Data Updated Successfully.");
                    navigate("/allTeacher");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Update failed. Please check the data and try again.");
                });
        };


  return (
    <>
    <div class='container'>
    <div class='header'>
        <div class='text'>Update Student</div>
        <div class='underline'></div>
    </div>
    <div class='inputs'>
        <div class='input'>
        <input type="text" name="username" value={student.username} onChange={(e)=>handleChange(e)} placeholder='Username'/>
        </div>
        <div class='input'>
        <input type="text" name="name" value={student.name} onChange={(e)=>handleChange(e)} placeholder='Name'/>
        </div>
        <div class='input'>
        <input type="password" name="password" value={student.password} onChange={(e)=>handleChange(e)} placeholder='Password'/>
        </div>
        <div class='input'>
        <input type="email" name="mail" value={student.mail} onChange={(e)=>handleChange(e)} placeholder='Mail'/>
        </div>
         <div class='input'>
        <input type="text" name="tenthBoard" value={student.tenthBoard} onChange={(e)=>handleChange(e)} placeholder='10th Board'/>
        </div>
        <div class='input'>
        <input type="text" name="tenthMarks" value={student.tenthMarks} onChange={(e)=>handleChange(e)} placeholder='10th Marks'/>
        </div>
        <div class='input'>
        <input type="text" name="twelfthBoard" value={student.twelfthBoard} onChange={(e)=>handleChange(e)} placeholder='12th Board'/>
        </div>
        <div class='input'>
        <input type="text" name="twelfthMarks" value={student.twelfthMarks} onChange={(e)=>handleChange(e)} placeholder='12th Marks'/>
        </div>
        <div class='input'>
        <input type="text" name="twelfthStream" value={student.twelfthStream} onChange={(e)=>handleChange(e)} placeholder='12th Stream'/>
        </div>
        <div class='input'>
        <input type="text" name="anyCompExam" value={student.anyCompExam} onChange={(e)=>handleChange(e)} placeholder='Any Competition Exam Attempted'/>
        </div>
        <div class='input'>
        <input type="text" name="compExamRank" value={student.compExamRank} onChange={(e)=>handleChange(e)} placeholder='Competitive Exam Rank'/>
        </div>
        
    </div>
    <div class='submit'>
    <div class='submit'><button onClick={updateStudent}>Update</button></div>
    <div class='submit'><button onClick={()=>navigate("/adminDashboard")}>Cancel</button></div>
    </div>
   </div>
   <div class="input"><button onClick={() => navigate("/logout")}>Logout</button></div>
    </>
  )
}

export default UpdateStudent
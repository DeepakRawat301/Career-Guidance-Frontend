import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentServices from '../../services/StudentService/StudentServices';

const StudentRegister = () => {

    const[student,registerStudent]=useState({
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

      const handleChange=(e)=>{
        const value=e.target.value;
        registerStudent({...student,[e.target.name]:value})
      }

      const reset = (e) => {
        e.preventDefault();
        registerStudent({
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
      };

      const saveStudent = (e) => {
            e.preventDefault();
          
          
            StudentServices.saveStudent(student)
              .then((response) => {
                console.log("saved", response);
                alert("Details Saved! Verify your Mail.");
                navigate("/studentVerify");
              })
              .catch((error) => {
                if (error.response) {
                  console.log("Backend responded with error:");
                  console.log("Status:", error.response.status);
                  console.log("Data:", error.response.data);
                  alert("Error: " + error.response.data);
                } else if (error.request) {
                  console.log("No response received. Request was:", error.request);
                  alert("No response from server.");
                } else {
                  console.log("Error in setting up request:", error.message);
                  alert("Error: " + error.message);
                }
              });
          };

      const navigate = useNavigate();


  return (
    <>
    <div class='container'>
    <div class='header'>
        <div class='text'>Student Registration Form</div>
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
        <div class='submit'><button onClick={saveStudent}>Next</button></div>
        <div class='submit'><button onClick={reset}>Clear</button></div>
        <div class='submit'><button onClick={()=>navigate("/adminDashboard")}>Cancel</button></div>
    </div>
   </div>
   <div class="input"><button onClick={() => navigate("/logout")}>Logout</button></div>
    </>
  )
}

export default StudentRegister
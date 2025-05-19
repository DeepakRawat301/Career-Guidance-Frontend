import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import AdminServices from '../../services/AdminService/AdminServices';

const QuestionsList = () => {

    const [loading, setLoading] = useState(true);
    const [tests,setTest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
         setLoading(true);
         try{
           const response = await AdminServices.getTest();
           setTest(response.data || []);
         }catch(error) {
           console.log(error);
         }
         setLoading(false);
        };
        fetchData();
   }, []);

   const deleteQuestion = (e, id) => {
    e.preventDefault();
    AdminServices.deleteQuestionById(id)
          .then(() => {
           if(tests){
            setTest((prevElement) => {
             return  prevElement.filter((test) => test.id !== id);
            })
           }
          })
};


const editQuestion = (e,id) => {
    e.preventDefault();
    navigate(`/editQuestion/${id}`)
};


  return (
    <>
    <div class='teacherlist'>
      <h2>All Questions Details</h2>
    </div>

    <div class='table'>
      <table>
        <thead>
        <tr>
          <th>Question ID</th>
          <th>Question</th>
          <th>Options</th>
          <th>Correct Answer</th>
          <th>Section</th>
          </tr>
        </thead>
        {!loading && (
        <tbody>
         {tests.map((test)=>(
        <tr key={test.id}>
        <td>{test.id}</td>
        <td>{test.question}</td>
        <td>{test.options}</td>
        <td>{test.correctAnswer}</td>
        <td>{test.section}</td>
          <td>
            <a onClick={(e,id)=> editQuestion(e, test.id)}>Edit</a>
            <a onClick={(e,id)=> deleteQuestion(e, test.id)}>Delete</a>
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

export default QuestionsList
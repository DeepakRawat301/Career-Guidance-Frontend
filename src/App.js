import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './components/Admin/AdminLogin';
import StudentLogin from './components/Student/StudentLogin';
import AdminRegister from './components/Admin/AdminRegister';
import AdminVerify from './components/Admin/AdminVerify';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogout from './components/Admin/AdminLogout';
import AdminUpdate from './components/Admin/AdminUpdate';
import StudentRegister from './components/Student/StudentRegister';
import StudentVerify from './components/Student/StudentVerify';
import UpdateStudent from './components/Student/UpdateStudent';
import StudentLogout from './components/Student/StudentLogout';
import StudentDashboard from './components/Student/StudentDashboard';
import AddCollege from './components/Admin/AddCollege';
import AllCollege from './components/Admin/AllCollege';
import UpdateCollege from './components/Admin/UpdateCollege';
import AddQuestions from './components/Admin/AddQuestions';
import QuestionsList from './components/Admin/QuestionsList';
import UpdateQuestion from './components/Admin/UpdateQuestion';
import StudentsList from './components/Admin/StudentsList';
import AttemptTest from './components/Student/AttemptTest';
import EligibleCollege from './components/Student/EligibleCollege';


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path="/studentlogin" element={<StudentLogin/>}/>
      <Route path="/login" element={<AdminLogin/>}/>
      <Route path="/sAdmin" element={<AdminRegister/>}/>
      <Route path="/adminVerify" element={<AdminVerify/>}/>
       <Route path="/adminDashboard" element={<AdminDashboard/>}/>
      <Route path="/logout" element={<AdminLogout/>}/>
       <Route path="/updateAdmin/:username" element={<AdminUpdate/>}/>

       <Route path="/addStudent" element={<StudentRegister/>}/>
       <Route path="/studentVerify" element={<StudentVerify/>}/>
        <Route path="/editStudent/:username" element={<UpdateStudent/>}/>
        <Route path="/studentDashboard" element={<StudentDashboard/>}/>
        <Route path="/studentLogout" element={<StudentLogout/>}/>

        <Route path="/addCollege" element={<AddCollege/>}/>
        <Route path="/allCollege" element={<AllCollege/>}/>
        <Route path="/editCollege/:id" element={<UpdateCollege/>}/>

        <Route path="/addQuestions" element={<AddQuestions/>}/>
        <Route path="/allQuestions" element={<QuestionsList/>}/>
        <Route path="/editQuestion/:id" element={<UpdateQuestion/>}/>

        <Route path="/allStudents" element={<StudentsList/>}/>

        <Route path="/giveTest" element={<AttemptTest/>}/>
         <Route path="/checkEligibility" element={<EligibleCollege/>}/>
       
       

      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;

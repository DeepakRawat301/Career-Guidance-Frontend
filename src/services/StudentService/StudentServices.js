import axios from 'axios'

const Login_API="http://localhost:8080/login"

const USERNAME_API = "http://localhost:8080/api/username";

const LOGOUT_API = "http://localhost:8080/api/logout";

const Student_Register_API="http://localhost:8080/public/student/signup"

const Student_Verification_API="http://localhost:8080/public/student/verify"

const Edit_Student_API="http://localhost:8080/student/update"

const Student_ByUSername_API="http://localhost:8080/student/searchByUsername"

const Delete_Student_API="http://localhost:8080/student/delete"

const Question_List_API="http://localhost:8080/student/allQuestion"

const Submit_Test_API="http://localhost:8080/student/submitTest"

const Eligible_College_API="http://localhost:8080/student/check"

const Search_College_API="http://localhost:8080/student/searchCollegeBy"


class StudentServices{

    login(admin) {
        const formData = new URLSearchParams();
        formData.append("username", admin.username);
        formData.append("password", admin.password);

        return axios.post(Login_API, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        });
    }


    logout() {
        return axios.post(LOGOUT_API, null, { withCredentials: true });
    }

    getLoggedInUsername() {
        return axios.get(USERNAME_API, {
            withCredentials: true
        });
    }

    saveStudent(student){
        return axios.post(Student_Register_API,student,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    verificationStudent(student){
        return axios.post(Student_Verification_API,student,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    getStudentByUsername(username) {
        return axios.get(`${Student_ByUSername_API}?username=${encodeURIComponent(username)}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });

    }

    updateStudentByUsername(student, username) {
        return axios.put(`${Edit_Student_API}/${username}`, student, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    

    deleteStudentByUsername() {
        return axios.delete(Delete_Student_API, { withCredentials: true });
    }

    getTest(){
        return axios.get(Question_List_API,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }

     submitTest(submissions){
        return axios.post(Submit_Test_API,submissions,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }

getEligibleCollege() {
  return axios.get(Eligible_College_API, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

 searchCollegeBy(keyword) {
  return axios.get(`${Search_College_API}/${keyword}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });
}




}

export default new StudentServices();
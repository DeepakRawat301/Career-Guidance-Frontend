import axios from 'axios';

const Login_API="http://localhost:8080/login"

const USERNAME_API = "http://localhost:8080/api/username";

const LOGOUT_API = "http://localhost:8080/api/logout";

const Get_Admin_API="http://localhost:8080/admin/searchByUsername";

const Admin_Update_API="http://localhost:8080/admin/update";

const Admin_Delete_API="http://localhost:8080/admin/delete";

const Admin_Register_API="http://localhost:8080/public/admin/signup"

const Admin_Verification_API="http://localhost:8080/public/admin/verify"

const College_Add_API="http://localhost:8080/admin/addCollege"

const College_List_API="http://localhost:8080/admin/allCollege"

const College_ById_API="http://localhost:8080/admin/college/searchById"

const Edit_College_API="http://localhost:8080/admin/college/update"

const Delete_College_API="http://localhost:8080/admin/college/delete"

const Question_Add_API="http://localhost:8080/admin/addQuestion"

const Question_List_API="http://localhost:8080/admin/allQuestion"

const Question_ById_API="http://localhost:8080/admin/question/searchById"

const Edit_Question_API="http://localhost:8080/admin/question/update"

const Delete_Question_API="http://localhost:8080/admin/question/delete"

const Students_List_API="http://localhost:8080/admin/allStudents"



class AdminServices{

    saveAdmin(admin){
            return axios.post(Admin_Register_API,admin,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
        }
    
        verificationAdmin(admin){
            return axios.post(Admin_Verification_API,admin,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
        }

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

     getAdminByUsername(username) {
        return axios.get(Get_Admin_API + "?username=" + username,{
            withCredentials:true
        });
    }
    
    updateAdminByUsername(admin, username) {
        return axios.put(Admin_Update_API, admin, { withCredentials: true });

    }

    deleteAdminByUsername() {
        return axios.delete(Admin_Delete_API, { withCredentials: true });
    }


    saveCollege(college){
            return axios.post(College_Add_API,college,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
        }

        getColleges(){
        return axios.get(College_List_API,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }


    getCollegeById(id) {
        return axios.get(`${College_ById_API}?id=${encodeURIComponent(id)}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });

    }

    updateCollegeById(college, id) {
        return axios.put(`${Edit_College_API}/${id}`, college, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

     deleteCollegeById(id) {
        return axios.delete(`${Delete_College_API}/${encodeURIComponent(id)}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    saveTest(test){
            return axios.post(Question_Add_API,test,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
        }

    getTest(){
        return axios.get(Question_List_API,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }


    getQuestionById(id) {
        return axios.get(`${Question_ById_API}?id=${encodeURIComponent(id)}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });

    }

    updateQuestionById(test, id) {
        return axios.put(`${Edit_Question_API}/${id}`, test, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

     deleteQuestionById(id) {
        return axios.delete(`${Delete_Question_API}/${encodeURIComponent(id)}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    getStudents(){
        return axios.get(Students_List_API,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }
    
    


}

export default new AdminServices();
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminServices from '../../services/AdminService/AdminServices';
import './AdminUpdate.css';

const AdminUpdate = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        username: "",
        name: "",
        password: "",
        mail: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setAdmin({ ...admin, [e.target.name]: value })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AdminServices.getAdminByUsername(username);
                setAdmin(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [username]);

    const updateAdmin = (e) => {
        e.preventDefault();
        AdminServices.updateAdminByUsername(admin, username)
            .then((response) => {
                console.log("saved", response);
                alert("Data Updated Successfully.");
                navigate("/adminDashboard");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            {/* The logout button is now at the top of the component hierarchy */}
            <div className="logout-button-container">
                <button className="logout-button" onClick={() => navigate("/logout")}>Logout</button>
            </div>

            <div className='container'>
                <div className='header'>
                    <div className='text'>Update Admin</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input type="text" name="username" value={admin.username} onChange={(e) => handleChange(e)} placeholder='Username' />
                    </div>
                    <div className='input'>
                        <input type="text" name="name" value={admin.name} onChange={(e) => handleChange(e)} placeholder='Name' />
                    </div>
                    <div className='input'>
                        <input type="password" name="password" value={admin.password} onChange={(e) => handleChange(e)} placeholder='Password' />
                    </div>
                    <div className='input'>
                        <input type="email" name="mail" value={admin.mail} onChange={(e) => handleChange(e)} placeholder='Mail' />
                    </div>
                </div>
                <div className='submit-button-container'>
                    <button className='submit-button' onClick={updateAdmin}>Update</button>
                    <button className='submit-button' onClick={() => navigate("/adminDashboard")}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default AdminUpdate;
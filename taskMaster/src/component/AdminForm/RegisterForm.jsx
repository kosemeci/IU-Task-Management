import { useState } from "react";
import '../../css/admin.css';
import axios from "axios";

function UserForm() {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        position: "",
        birthDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        userData.email = `${userData.firstName.slice(0, 1)}_${userData.lastName.toLowerCase()}@tms.com`
        userData.password = "Tms.1234"
        try {
            const response = await axios.post('http://localhost:8080/auth/register',
                {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    mailAdress: userData.email,
                    position: userData.position,
                    password: userData.password,
                    telNumber: userData.phone,
                    birthOfDate: userData.birthDate
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                    timeout: 20000
                }
            );
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="form-container">
            <h3 className="form-title">Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                {/* <div className="form-group">
                    <label className="form-label" htmlFor="role">
                        Role
                    </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div> */}
                <div className="form-group">
                    <label className="form-label" htmlFor="position">
                        Position
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={userData.position}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="birthDate">
                        Birth Date
                    </label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={userData.birthDate}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Save
                </button>
            </form>
        </div>
    );
}

export default UserForm;
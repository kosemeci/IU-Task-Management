import { useState } from "react";
import '../../css/admin.css';

function UserForm() {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // User data can be processed here
        console.log(userData);
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
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
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
                <div className="form-group">
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
                </div>
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
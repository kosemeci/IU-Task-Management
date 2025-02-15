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
        // Kullanıcı verisi burada işlenebilir
        console.log(userData);
    };

    return (
        <div className="task-form-container">
            <h3 className="task-form-title">Yeni Kullanıcı Oluştur</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                        Ad
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
                        Soyad
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
                        E-posta
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
                        Telefon Numarası
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
                        Rol
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
                        Pozisyon
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
                        Doğum Günü
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
                    Kaydet
                </button>
            </form>
        </div>
    );
}

export default UserForm;

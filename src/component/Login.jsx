import { useContext, useState } from "react";
import "../css/login.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields!");
            return;
        }

        setError("");

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/login",
                {
                    mailAdress: email,
                    password: password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                    timeout: 15000
                }
            );
            // console.log(response.data);

            if (response.data) {
                const responseUser = await axios.get(
                    "http://localhost:8080/auth/fetch/id",
                    {
                        params: { mail: email },
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true,
                        timeout: 15000
                    }
                );
                // console.log(responseUser.data.id);
                login({ email, userId: responseUser.data.id, role: responseUser.data.role });
            }

        } catch (error) {
            console.log(error)
            if (error.response) {
                setError(error.response.data);
            } else {
                setError("Bir hata oluştu, lütfen tekrar deneyin.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
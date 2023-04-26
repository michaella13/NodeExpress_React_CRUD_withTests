import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/login.css'
import axios from "axios";


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token !== null) {
            navigate("/students")
        }
    }, [])
    const validateForm = () => {
        const errors = {};
        if (!username.trim()) {
            errors.username = "Username is required";
        }

        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("My token: ", localStorage.getItem("token"));
        if (validateForm()) {
            console.log("in handle submit with username and password " + username + password)
            axios.post("http://localhost:8000/login", {
                username,
                password
            }
            )
                .then((response) => {
                    console.log(response);
                    localStorage.setItem("token", response.data.token)
                    navigate("/students");
                    console.log("response from server " + response.data.message);

                })
                .catch(err => {
                    console.log("Login unsuccessful ", +err)
                    if (err.response.status === 401 || err.response.status === 404) {
                        setFormErrors({
                            username: "",
                            password: "Invalid credentials",
                        })
                    }
                })
        }
        else {
            console.log("Validate form unsuccessful")
        }
    };





    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={formErrors.username ? "error" : ""}
                    />
                    {formErrors.username && (
                        <span className="error-message">{formErrors.username}</span>
                    )}

                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={formErrors.password ? "error" : ""}
                    />

                    {formErrors.password && (
                        <span className="error-message">{formErrors.password}</span>
                    )}
                </div>

                <button type="submit">Login</button>
                <div>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </form>

        </div>
    );
};

export default Login;
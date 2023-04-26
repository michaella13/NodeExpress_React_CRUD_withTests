import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/signup.css'
import axios from "axios";


const Signup = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [usernameError, setUsernameError] = useState("");

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!termsAgreed) {
      errors.termsAgreed = "You must agree to the terms and conditions";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    checkUsernameAvailability();
    
  };
  
  const checkUsernameAvailability = () => {
    if (validateForm()) {
    axios.post("http://localhost:8000/checkUsername", {
        username
      })
      .then((result) => {
        if (result.data.message === "Username already exists") {
          setUsernameError(result.data.message)
        }else{
          postSignup();
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
  };
  
  const postSignup = () => {
   
      axios
        .post("http://localhost:8000/signup", {
          username,
          email,
          password,
          termsAgreed
        })
        .then((result) => {
          console.log(
            "Signup successful. Response from server: " + JSON.stringify(result.data)
          );
          navigate("/");
        })
        .catch((err) => {
          console.log("Signup unsuccessful. Error: " + err);
        });
    
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={formErrors.username ? "error" : ""}
          />
          {formErrors.username && (
            <span className="error-message">{formErrors.username}</span>
          )}
          {usernameError && (
            <span className="error-message">{usernameError}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={formErrors.email ? "error" : ""}
          />
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={formErrors.password ? "error" : ""}
        />
       
        {formErrors.password && (
          <span className="error-message">{formErrors.password}</span>
        )}
      </div>
      <div className="form-group">
        <input
          type="checkbox"
          id="termsAgreed"
          checked={termsAgreed}
          onChange={(e) => setTermsAgreed(e.target.checked)}
          className={formErrors.termsAgreed ? "error" : ""}
        />
        <label htmlFor="termsAgreed" className="agree">
          I agree to the terms and conditions
        </label>
        {formErrors.termsAgreed && (
          <span className="error-message">{formErrors.termsAgreed}</span>
        )}
      </div>
      <button type="submit">Sign up</button>
      <div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </form>
    </div>
  );
};

export default Signup;
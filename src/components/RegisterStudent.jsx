import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!course.trim()) {
      errors.course = "Course is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const token = localStorage.getItem('token')
  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:8000/students", {
          name,
          email,
          course,
        },config)
        .then((result) => {
          console.log("response from server " + result);
          navigate("/students");
        })
        .catch((err) => {
          console.log("Signup unsuccessful ", +err);
        });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={formErrors.name ? "error" : ""}
          />
          {formErrors.name && (
            <span className="error-message">{formErrors.name}</span>
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
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={formErrors.course ? "error" : ""}
          />
          {formErrors.course && (
            <span className="error-message">{formErrors.course}</span>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
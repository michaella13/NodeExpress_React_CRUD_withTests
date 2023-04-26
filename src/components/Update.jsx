import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

// const UpdateStudent = ({ student, onClose }) => {
//   console.log("student object :", student)
//   const [name, setName] = useState(student.name || '');
//   const [email, setEmail] = useState(student.email || '');
//   const [course, setCourse] = useState(student.course || '');
//   const [formErrors, setFormErrors] = useState({});
const UpdateStudent = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [course, setCourse] = useState();
  const [formErrors, setFormErrors] = useState({});
  const { id } = useParams();

  const token = localStorage.getItem('token')
  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/students/${id}`,config)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setCourse(response.data.course);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  
const navigate=useNavigate();
  const handleUpdate = () => {
    const data = { name, email, course };
    // axios.put(`http://localhost:8000/students/${student.id}`, data)
    //   .then(() => {
    //     onClose();
    //     navigate('/students')
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     navigate('/students')  
    //   });
 
  
    axios.put(`http://localhost:8000/students/${id}`,data, config)
      .then(() => {
        navigate('/students')
      })
      .catch((error) => {
        console.log(error);
        navigate('/students') 
      });
  
  };

  const handleCancel = () => {
    // onClose();
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!course.trim()) {
      errors.course = "Course is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleUpdate();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>&times;</span>
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
          <button type="submit" className="update-button">Update</button>
        </form>
      </div>
    </div>
  );
};
export default UpdateStudent;
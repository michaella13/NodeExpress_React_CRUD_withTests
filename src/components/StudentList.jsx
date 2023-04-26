import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import UpdateStudent from './Update';
import '../styles/display.css'
import { useNavigate,Link } from 'react-router-dom';


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  // const [editStudentId, setEditStudentId] = useState(null);

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    axios.get('http://localhost:8000/students', config)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        } else {
          console.log(error);
        }
      });
  }, [navigate]);

  // if (editStudentId !== null) {
  //   const student = students.find((student) => student.id === editStudentId);
  //   if (student!==null) {
  //     navigate(`/update/${editStudentId}`);
  //   return <UpdateStudent student={student} setStudents={setStudents} />;
  //   } else {
  //     console.log(`Could not find student with id ${editStudentId}`);
  //   }
  // }
 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/students/${id}`, config)
      .then(() => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
        navigate('/students')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // if (editStudentId !== null) {
  //   navigate(`/students/${student.id}`);
  //   return <UpdateStudent student={student} setStudents={setStudents} />;
  // }
 
  
 
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => {
          // return (
          //   <React.Fragment key={student.id}>
          //     {editStudentId === student.id ? (
          //       <UpdateStudent student={student} setStudents={setStudents}></UpdateStudent>
                
          //     ) : (
          //       <tr>
          //         <td>{student.name}</td>
          //         <td>{student.email}</td>
          //         <td>{student.course}</td>
          //         <td>
          //           <button onClick={() => setEditStudentId(student.id)}>Edit</button>
          //           <button onClick={() => handleDelete(student.id)}>Delete</button>
          //         </td>
          //       </tr>
          //     )
          return (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => setEditStudent(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          );
              }

            // </React.Fragment>
          )
        }
        {/* )} */}
      </tbody>
    </table>
    {editStudent && (
      // <Link to={`/update/${editStudent.id}`}>Edit {editStudent.name}</Link>
      navigate(`update/${editStudent.id}`)
    )}
    <button onClick={() => navigate('/addStudents')}>Add Student</button>
    </div>
  );
};

export default StudentList;
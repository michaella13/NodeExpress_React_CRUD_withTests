import Signup from './components/Signup';
import StudentList from './components/StudentList';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UpdateStudent from './components/Update';
import Register from './components/RegisterStudent';



function App() {

  return (
   
    <Router>
    <Routes>
      <Route path="/students" element={<StudentList/>}/>
      <Route path="/addStudents" element={<Register/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/students/update/:id" element={<UpdateStudent/>} />
    </Routes>
  </Router>
  );
}

export default App;

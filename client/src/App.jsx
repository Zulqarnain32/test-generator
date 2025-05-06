import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import TestGenerator from './components/TestGenerator'; // This is the page with chapter selection and question listing
import Navbar from './components/Navbar';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { AuthContext } from './global/AuthContext'
import { useContext } from 'react';
import McqsGenerator from './components/McqsGenerator';

function App() {
   const { user } = useContext(AuthContext);
  //  console.log("home user is ", user)
  
  return (
    <Router>
      <ToastContainer 
        position="top-center" 
        autoClose={2000}
      />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/test-generator" element={<TestGenerator/>} /> */}
        <Route path="/test-generator" element={user?.email ? <TestGenerator/>:<Login/>} />
        <Route path="/test-generator/mcqs-generator" element={<McqsGenerator/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
}

export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import TestGenerator from './components/TestGenerator'; // This is the page with chapter selection and question listing
import Navbar from './components/Navbar';
import Login from './components/Login';
function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test-generator" element={<TestGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;


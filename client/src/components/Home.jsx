import React  from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../global/AuthContext';
import { useContext } from 'react';
const Home = () => {
    const { user } = useContext(AuthContext);
  return (
    <div className= "overflow-hidden h-[calc(100vh-70px)] top-[70px] bg-body flex flex-col justify-center items-center text-text">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="xs:text-3xl md:text-5xl font-extrabold">Welcome <span className='text-blue-500'>{user?.email}</span> to the Test Generator</h1>
        <p className="text-xl">
          Generate custom tests for your Computer Science study material in just a few clicks.
        </p>
        <Link to="/test-generator">
          <button className="mt-5 mr-3 w-[270px] xs:mr-0 bg-navbar hover:bg-black text-white text-lg py-2 rounded-lg shadow-lg ">
            Start Generating Questions
          </button>
        </Link>
        <Link to="/mcqs-generator">
          <button className="mt-5 ml-3 w-[270px] xs:ml-0 bg-navbar hover:bg-black text-white text-lg py-2  rounded-lg shadow-lg ">
            Start Generating Mcqs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

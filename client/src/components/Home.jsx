import React  from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../global/AuthContext';
import { useContext } from 'react';
const Home = () => {
    const { user } = useContext(AuthContext);
    console.log("home user is ", user)
  return (
    <div className= "h-[calc(100vh-70px)] bg-body flex flex-col justify-center items-center text-text">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold">Welcome <span className='text-blue-500'>{user?.email}</span> to the Test Generator</h1>
        <p className="text-xl">
          Generate custom tests for your Computer Science study material in just a few clicks.
        </p>
        <Link to="/test-generator">
          <button className="mt-5 bg-navbar hover:bg-black text-white text-lg py-2 px-6 rounded-lg shadow-lg ">
            Start Generating Test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

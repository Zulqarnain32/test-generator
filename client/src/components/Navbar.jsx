import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useCookies } from "react-cookie";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import { AuthContext } from "../global/AuthContext";
import axios from "axios";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
const Navbar = () => {

  const [showNavbar, setShowNavbar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("navbar user is ", user)
 

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNav = () => {
    setShowNavbar(false);
  };

  const handleLogout = () => {
    console.log("logout button clicke");
    setUser(null); // clear user context
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    toast.success("Logged out successfully", { autoClose: 2000 });

    setTimeout(() => {
      navigate("/");
    }, 100); // slight delay to let toast render
  };

  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNavbar]);

  return (
    <div
  className="bg-navbar w-full sticky top-0 h-[70px] flex justify-between items-center px-10 xs:px-5 z-10">
      <div className="flex items-center text-[25px] text-white">
        <h4 className="font-extrabold">
            TESTSOLUTION 
        </h4>
      </div>
      <div
        className="block md:hidden cursor-pointer"
        onClick={handleShowNavbar}
      >
        <GiHamburgerMenu className="text-3xl text-white" />
      </div>
      <div
        className={`xs:bg-navbar xs:text-white absolute md:static top-[70px] left-0 w-[140px] md:w-auto h-screen md:h-auto transition-all duration-300 ease-in overflow-hidden z-50 md:flex md:items-center md:space-x-4 md:text-[18px] font-bold uppercase tracking-wide ${
          showNavbar ? "left-0" : "left-[-140px]"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-[35px] md:hidden"
          onClick={closeNav}
        >
          <RxCross2 />
        </button>
        <Link
          to="/"
          className="text-white md: block py-4 px-4 border-b md:border-0"
          onClick={closeNav}
        >
          Home
        </Link>
       
        <Link
          to="/favorite"
          className="md:text-white  block py-4 px-4 border-b md:border-0"
          onClick={closeNav}
        >
          {user?.email}


          
        </Link>
        {/* {isAdmin && (
          <Link
            to="/dashboard"
            className="md:text-white  block py-4 px-4 border-b md:border-0"
            onClick={closeNav}
          >
            DASHBOARD
          </Link>
        )} */}

        {/* {user && (
          <Link
            className="text-red-500  md:text-red-500 block py-4 px-4 border-b md:border-0 xs:text-sm"
            onClick={closeNav}
          >
            {user.username}
          </Link>
        )} */}

        

        {user?.email ? (
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 rounded-sm text-white block py-1.5 xs:m-3  px-4  md:border-0 cursor-pointer  "
          >
            LOGOUT
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 rounded-sm text-white block py-1.5 xs:m-3  px-4  md:border-0 cursor-pointer  "
            onClick={closeNav}
          >
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
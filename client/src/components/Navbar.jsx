import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import React from "react";
import { AuthContext } from "../global/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const navRef = useRef();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar); // Toggle based on the previous state
  };

  

  const closeNav = () => {
    setShowNavbar(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    toast.success("Logged out successfully", { autoClose: 2000 });

    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  // Close navbar on outside click (mobile only)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showNavbar && navRef.current && !navRef.current.contains(e.target)) {
        setShowNavbar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showNavbar]);

  // Disable scroll when navbar is open
  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNavbar]);

  return (
    <div className="relative z-50">
      {/* Overlay */}
      {showNavbar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden" />
      )}

      <div className="bg-navbar w-full sticky top-0 h-[70px] flex justify-between items-center px-10 xs:px-5 z-50">
        <div className="flex items-center text-[25px] text-white">
          <h4 className="font-extrabold">TESTSOLUTION</h4>
        </div>

        <div className="block md:hidden cursor-pointer" onClick={handleShowNavbar}>
          <GiHamburgerMenu className="text-3xl text-white" />
        </div>

        <div
          ref={navRef}
          className={`xs:bg-navbar xs:text-white fixed md:static top-[70px] left-0 w-[150px] md:w-auto h-screen md:h-auto transition-all duration-300 ease-in-out overflow-hidden z-50 md:flex md:items-center md:space-x-4 md:text-[18px] font-bold uppercase tracking-wide ${
            showNavbar ? "left-0" : "left-[-200px]"
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

          {user?.email && (
            <Link
              to="dcn"
              className="xs:hidden md:text-white block py-4 px-4 border-b md:border-0"
              onClick={closeNav}
            >
              {user?.email}
            </Link>
          )}

          {user?.email ? (
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-600 rounded-sm text-white block py-1.5 xs:m-3 px-4 md:border-0 cursor-pointer"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 rounded-sm text-white block py-1.5 xs:m-3 px-4 md:border-0 cursor-pointer"
              onClick={closeNav}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


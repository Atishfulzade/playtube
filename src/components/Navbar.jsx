import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineMicrophone } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { logo } from "../assets";
import SearchBar from "./SearchBar";

const Navbar = () => {
  // State to track whether the user is logged in
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <div className="w-full px-1 md:px-6 flex items-center justify-between h-16">
      {/* Left side of the navbar */}
      <div className="flex items-center ">
        {/* Hamburger menu icon, visible only on medium screens and larger */}
        <HiOutlineMenu className="hidden md:text-[28px] md:mr-1 lg:mr-3 md:block text-slate-800" />

        {/* Logo */}
        <img src={logo} alt="Logo" className=" h-[60px] mt-3" />
      </div>
      <div className="flex items-center justify-between">
        {/* Search bar component */}
        <SearchBar />

        {/* Microphone icon, visible only on medium screens and larger */}
        <div className="hidden w-[40px] h-[40px] ml-3 border text-slate-700 border-slate-300 rounded-full md:flex items-center justify-center">
          <HiOutlineMicrophone className="text-[20px]" />
        </div>
      </div>

      {/* Right side of the navbar */}
      <div>
        {isLogIn ? (
          // User icon when logged in
          <div className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center">
            <FiUser className="text-[20px]" />
          </div>
        ) : (
          // Login button when not logged in
          <button className="w-[84px] h-[42px] bg-red-600 text-white rounded-full cursor-pointer">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

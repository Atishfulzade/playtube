import React, { useRef, useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineMicrophone } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { logo } from "../assets";
import SearchBar from "./SearchBar";
import { channelIconURL, channelName } from "../utils/constant";
import SettingSidebar from "./SettingSidebar";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const settingCardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  // State to track whether the user is logged in
  const [input, setInput] = useState("");
  const [isSettingSidebar, setIsSettingSidebar] = useState(false);
  function showSettingSidebar() {
    setIsSettingSidebar(!isSettingSidebar);
  }
  const handleCloseSettingBar = (e) => {
    if (settingCardRef.current && !settingCardRef.current.contains(e.target)) {
      setIsSettingSidebar(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleCloseSettingBar);
    return () => {
      document.removeEventListener("mousedown", handleCloseSettingBar);
    };
  }, []);
  const isMobile = useSelector((state) => state.windowSize.isMobile);
  const isLoggedIn = useSelector((state) => state.loggedStatus.isLoggedIn);
  return (
    <div className="w-full transition-all sticky top-0 bg-white z-20 px-1  md:px-6 flex items-center justify-between h-16">
      {/* Left side of the navbar */}
      <div className="flex items-center ">
        {/* Hamburger menu icon, visible only on medium screens and larger */}
        <HiOutlineMenu className="hidden md:text-[28px] md:mr-1 lg:mr-3 md:block text-slate-800" />

        {/* Logo */}
        <img src={logo} alt="Logo" className=" h-[60px] mt-3" />
      </div>
      <div className="flex items-center justify-between">
        {/* Search bar component */}
        {isMobile ? (
          <FiSearch onClick={() => isMobile && setIsOpen(!isOpen)} />
        ) : (
          <SearchBar
            setInput={setInput}
            input={input}
            isMobile={isMobile}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}

        {/* Microphone icon, visible only on medium screens and larger */}
        <div className="hidden w-[40px] cursor-pointer h-[40px] ml-3 border text-slate-700 border-slate-300 rounded-full md:flex items-center justify-center">
          <HiOutlineMicrophone className="text-[20px]" />
        </div>
      </div>

      {/* Right side of the navbar */}
      <div>
        {isLoggedIn ? (
          // User icon when logged in
          <div
            onClick={showSettingSidebar}
            className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center"
          >
            <FiUser className="text-[20px]" />
          </div>
        ) : (
          // Login button when not logged in
          <button className="py-1 bg-white border-blue-500 border text-blue-500  w-fit px-5 rounded-full">
            Log In
          </button>
        )}
      </div>
      {isSettingSidebar && <SettingSidebar settingCardRef={settingCardRef} />}
    </div>
  );
};

export default Navbar;

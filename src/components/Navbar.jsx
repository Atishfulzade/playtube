import React, { useRef, useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineMicrophone } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { logo, userPng } from "../assets";
import SearchBar from "./SearchBar";
import { channelIconURL, channelName } from "../utils/constant";
import SettingSidebar from "./SettingSidebar";
import { FiSearch } from "react-icons/fi";
import SuggestionPage from "./SuggestionPage";
import AuthenticationPage from "./AuthenticationPage";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const settingCardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // State to track whether the user is logged in
  const [input, setInput] = useState("");
  const [isSettingSidebar, setIsSettingSidebar] = useState(false);
  const userInfo = useSelector((state) => state.loggedStatus.user);

  const navigate = useNavigate();
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
    <div className="w-full  transition-all sticky top-0 bg-white z-20 px-1  md:px-6 flex items-center justify-between h-16">
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
          <FiSearch
            onClick={() => isMobile && setIsOpen(!isOpen)}
            className="text-xl text-slate-700"
          />
        ) : (
          <SearchBar
            setInput={setInput}
            input={input}
            isMobile={isMobile}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
        {isMobile && isOpen && (
          <SuggestionPage isOpen={isOpen} setIsOpen={setIsOpen} />
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
            className="w-[40px] h-[40px] border border-[#b3b3b3] overflow-hidden rounded-full flex items-center justify-center"
          >
            <img
              src={userInfo.photoURL || userPng}
              alt="ProfilePhoto"
              className="h-full w-full object-cover cursor-pointer"
            />
          </div>
        ) : (
          // Login button when not logged in
          <button
            onClick={() => navigate("authenticate")}
            className="py-1 bg-white border-blue-500 border text-blue-500  w-fit px-5 rounded-full"
          >
            Log In
          </button>
        )}
      </div>

      {isSettingSidebar && <SettingSidebar settingCardRef={settingCardRef} />}
    </div>
  );
};

export default Navbar;

import React, { useRef, useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineMicrophone } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { logo, userPng } from "../assets";
import SearchBar from "./SearchBar";
import SettingSidebar from "./SettingSidebar";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MobileSuggestion from "./MobileSuggestion";

const Navbar = ({ setLeftSideBarOpen }) => {
  const settingCardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [microphoneOpen, setMicrophoneOpen] = useState(false);
  const [input, setInput] = useState(""); // State to store input from search or mic
  const [isSettingSidebar, setIsSettingSidebar] = useState(false);
  const userInfo = useSelector((state) => state.loggedStatus.user);
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.windowSize.isMobile);
  const isLoggedIn = useSelector((state) => state.loggedStatus.isLoggedIn);

  // Speech recognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  // Function to handle speech recognition results
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript); // Update the input state with the transcribed text
  };

  // Function to handle the microphone icon click
  const handleMicClick = () => {
    if (microphoneOpen) {
      recognition.stop(); // Stop recognition if the mic is already open
      setMicrophoneOpen(false);
    } else {
      recognition.start(); // Start recognition if the mic is not open
      setMicrophoneOpen(true);
    }
  };

  const showSettingSidebar = () => {
    setIsSettingSidebar(!isSettingSidebar);
  };

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

  return (
    <div className="w-full dark:bg-slate-800 dark:text-white transition-all sticky top-0 bg-white z-20 px-1  md:px-6 flex items-center justify-between h-16">
      {/* Left side of the navbar */}
      <div className="flex select-none items-center ">
        <HiOutlineMenu
          onClick={() => setLeftSideBarOpen((prev) => !prev)}
          className="hidden hover:bg-slate-200 dark:text-white p-2 md:text-[38px] rounded-full cursor-pointer md:mr-1 lg:mr-3 md:block text-slate-800"
        />
        {/* Logo */}
        <img src={logo} alt="Logo" className=" h-[60px] mt-3" />
      </div>
      <div className="flex items-center justify-between">
        {/* Search bar component */}
        {isMobile ? (
          <FiSearch
            onClick={() => isMobile && setIsOpen(!isOpen)}
            className="text-xl dark:bg-slate-800 dark:text-white text-slate-700"
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
          <MobileSuggestion
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            input={input}
            setInput={setInput}
          />
        )}
        {/* Microphone icon */}
        <div
          onClick={handleMicClick}
          className={`hidden dark:bg-slate-800 ${
            microphoneOpen
              ? "bg-slate-800 text-white animate-pulse"
              : "bg-white text-slate-800 animate-none"
          } dark:text-white w-[40px] cursor-pointer h-[40px] ml-3 border text-slate-700 border-slate-300 rounded-full md:flex items-center justify-center`}
        >
          <HiOutlineMicrophone className="text-[18px]" />
        </div>
      </div>
      {/* Right side of the navbar */}
      <div>
        {isLoggedIn ? (
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

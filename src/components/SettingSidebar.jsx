import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SlGlobe } from "react-icons/sl";
import { PiSignIn } from "react-icons/pi";
import { GoMoon } from "react-icons/go";
import { IoLanguageOutline } from "react-icons/io5";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../firebase.config";
import {
  setCountry,
  setIsLoggedIn,
  setLanguage,
  setTheme,
  setUser,
} from "../redux_Store/loggedInSlice";
import { userPng } from "../assets";
import SettingSidebarOption from "./SettingSideBarOption";
import { useNavigate } from "react-router-dom";
import { countries, deviceTheme, languages } from "../utils/constant";

function SettingSidebar({ settingCardRef }) {
  const [isSettingSidebar, setIsSettingSidebar] = useState(true);
  const [settingOptionsId, setSettingOptionsId] = useState(1);

  const userInfo = useSelector((state) => state.loggedStatus.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appearance = useSelector((state) => state.loggedStatus.theme);
  const language = useSelector((state) => state.loggedStatus.language);
  const location = useSelector((state) => state.loggedStatus.country);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(setIsLoggedIn(true));
      dispatch(
        setUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      navigate("/");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(setUser({}));
      await firebaseSignOut(auth);
      dispatch(setIsLoggedIn(false));
      toast.success("Successfully signed out!");
      navigate("/");
    } catch (error) {
      toast.error("Sign out failed: " + error.message);
    }
  };

  const settingSidebarData = [
    {
      id: 1,
      icon: <FcGoogle size="22" />,
      name: "Google Account",
      callFunction: loginWithGoogle,
    },
    {
      id: 2,
      icon: <PiSignIn size="22" />,
      name: "Sign out",
      callFunction: handleSignOut,
    },
    { id: 3, icon: <GoMoon size="22" />, name: `Appearance: ${appearance}` },
    {
      id: 4,
      icon: <IoLanguageOutline size="22" />,
      name: `Language: ${language}`,
    },
    { id: 5, icon: <SlGlobe size="22" />, name: `Location: ${location}` },
  ];

  function settingSidebarMenu(id) {
    setSettingOptionsId(id);
    setIsSettingSidebar(false);
  }

  useEffect(() => {}, []);

  return (
    <>
      <div
        className={`w-fit absolute top-12 py-3 ${
          isSettingSidebar ? "block" : "hidden"
        } right-5 bg-white shadow shadow-slate-400 rounded-md`}
      >
        <div className="flex cursor-default items-center px-3 py-2 border-b-[1px]">
          <img
            src={userInfo?.photoURL || userPng}
            alt={userInfo?.displayName}
            className="w-12 h-12 rounded-full"
          />
          <p className="ml-[10px] text-[18px]">
            {userInfo?.displayName || userInfo?.email}
          </p>
        </div>
        <div className="">
          {settingSidebarData.map((item) => (
            <div
              className={`flex items-center cursor-pointer hover:bg-slate-200 py-2 px-3 ${
                item.id === 2 ? "border-b-[1px]" : ""
              }`}
              key={item.id}
              onClick={() => {
                settingSidebarMenu(item.id);
                if (item.callFunction) {
                  item.callFunction();
                }
              }}
            >
              {item.icon}
              <p className="ml-[20px] cursor-pointer">{item.name}</p>
              <p className="ml-auto cursor-pointer">
                {item.id === 3 && <LiaAngleRightSolid />}
                {item.id === 4 && <LiaAngleRightSolid />}
                {item.id === 5 && <LiaAngleRightSolid />}
              </p>
            </div>
          ))}
        </div>
      </div>

      {settingOptionsId === 3 && (
        <SettingSidebarOption
          heading={"Appearance"}
          arrData={deviceTheme}
          setIsSettingSidebar={setIsSettingSidebar}
          selectOption={appearance}
          setSelectOption={(option) => dispatch(setTheme(option))}
        />
      )}
      {settingOptionsId === 4 && (
        <SettingSidebarOption
          heading={"Choose your language"}
          arrData={languages}
          setIsSettingSidebar={setIsSettingSidebar}
          selectOption={language}
          setSelectOption={(option) => dispatch(setLanguage(option))}
        />
      )}
      {settingOptionsId === 5 && (
        <SettingSidebarOption
          heading={"Choose your location"}
          arrData={countries}
          setIsSettingSidebar={setIsSettingSidebar}
          selectOption={location}
          setSelectOption={(option) => dispatch(setCountry(option))}
        />
      )}
    </>
  );
}

export default SettingSidebar;

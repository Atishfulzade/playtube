import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { setIsLoggedIn, setUser } from "../redux_Store/loggedInSlice";
import { auth } from "../../firebase.config";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";

const Layout = ({ leftSideBarOpen, setLeftSideBarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the base path excluding numbers and slashes
  const absolutePath = location.pathname.replace(/[0-9/]/g, "");

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, update the Redux store
        dispatch(setIsLoggedIn(true));
        const { uid, email, displayName, photoURL } = user;
        dispatch(setUser({ uid, email, displayName, photoURL }));
      } else {
        // If user is logged out, update the Redux store
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [navigate, dispatch]);

  return (
    <div className="flex flex-col dark:bg-slate-800 dark:text-white transition-all">
      <Navbar setLeftSideBarOpen={setLeftSideBarOpen} />
      <div className="flex w-full">
        {/* Render LeftSidebar if the path is not 'video' and sidebar is open */}
        {absolutePath !== "video" && leftSideBarOpen && <LeftSidebar />}
        <div className="w-full dark:bg-slate-800 dark:text-white md:w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

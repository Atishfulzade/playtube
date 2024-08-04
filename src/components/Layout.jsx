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
  const absolutePath = location.pathname.replace(/[0-9/]/g, "");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));
      } else {
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [navigate, dispatch]);

  return (
    <div className="flex flex-col transition-all">
      <Navbar setLeftSideBarOpen={setLeftSideBarOpen} />
      <div className="flex w-full">
        {absolutePath !== "video" && leftSideBarOpen && <LeftSidebar />}

        <div className="w-full md:w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

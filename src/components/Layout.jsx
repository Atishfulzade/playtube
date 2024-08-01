import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import LeftSidebar from "./LeftSidebar";
import { setIsLoggedIn } from "../redux_Store/loggedInSlice";
import { auth } from "../../firebase.config";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
        dispatch(setUserEmail(user.email)); // Dispatch the user's email to the store
        navigate("/");
      } else {
        dispatch(setIsLoggedIn(false));
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate, dispatch]);
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex w-full">
        <LeftSidebar />
        <div className="w-full md:w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

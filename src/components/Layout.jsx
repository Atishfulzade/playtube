import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, setUser } from "../redux_Store/loggedInSlice";
import { auth } from "../../firebase.config";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="flex flex-col">
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

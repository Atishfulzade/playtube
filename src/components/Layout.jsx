import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";

const Layout = () => {
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

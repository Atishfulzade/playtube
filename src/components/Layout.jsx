import { Outlet } from "react-router-dom";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";

const Layout = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

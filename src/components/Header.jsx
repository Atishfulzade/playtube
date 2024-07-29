import React from "react";
import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";
const Header = () => {
  return (
    <div className="sticky top-0 bg-white pb-2 z-50">
      <Navbar />
      <CategoryBar />
    </div>
  );
};

export default Header;

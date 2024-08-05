import React from "react";
import { useSelector } from "react-redux";
import { Videos } from "../components";
const WatchLater = ({ setLeftSideBarOpen }) => {
  const data = useSelector((state) => state.viewLater.playList);
  setLeftSideBarOpen(true);
  return (
    <div className="flex pb-10 p-5 flex-col h-full w-full">
      <h3 className="mb-3  md:text-xl">Your Watch later videos</h3>
      {data.length < 1 ? (
        "No video available"
      ) : (
        <Videos
          videoData={data}
          add={false}
          flex={"items-start justify-start"}
        />
      )}{" "}
    </div>
  );
};

export default WatchLater;

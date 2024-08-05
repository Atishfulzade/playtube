import React from "react";
import { useSelector } from "react-redux";
import { Videos } from "../components";
const History = ({ setLeftSideBarOpen }) => {
  const data = useSelector((state) => state.historyVideo.history);

  setLeftSideBarOpen(true);

  return (
    <div className="flex pb-10 p-5  flex-col h-full w-full">
      <h3 className="mb-3  md:text-xl">Liked videos</h3>
      {data.length < 1 ? (
        "History unavailable"
      ) : (
        <Videos
          videoData={data}
          add={false}
          flex={"items-start justify-start"}
        />
      )}
    </div>
  );
};

export default History;

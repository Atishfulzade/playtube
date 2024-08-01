import React from "react";
import { CategoryBar, Videos } from "../components";
const Feed = () => {
  return (
    <div
      className="flex flex-col w-full   justify-center   items-center
    "
    >
      <CategoryBar />
      <Videos isHorizantal={false} />
    </div>
  );
};

export default Feed;

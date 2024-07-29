import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  thumbnailsURL,
  channelIconURL,
  channelName,
  videoTitle,
} from "../utils/constant";
const VideoCard = () => {
  return (
    <div className=" w-[290px] h-[273px] cursor-pointer rounded-[10px] overflow-hidden">
      <img
        className="h-[167px] w-[290px] rounded-[10px] "
        src={thumbnailsURL}
        alt={channelName}
      />
      <div className="p-2 relative">
        <div className="flex">
          <img
            src={channelIconURL}
            alt={channelName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="ml-2 flex flex-col">
            <div className="flex">
              <h3 className="text-sm font-bold line-clamp-2 text-slate-900">
                {videoTitle}
              </h3>
              <BsThreeDotsVertical className="text-4xl " />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex flex-col">
                <h4 className="line-clamp-1">{channelName}</h4>
                <div className="flex gap-2 text-sm text-slate-600">
                  <span>450 views</span>
                  <span>4 months ago</span>
                </div>
              </div>
              <span className="bg-red-600 py-[2px] flex items-center justify-center h-fit px-3 text-center mb-0 text-white rounded">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  thumbnailsURL,
  channelIconURL,
  channelName,
  videoTitle,
  description,
} from "../utils/constant";
const VideoCard = ({ isHorizantal }) => {
  const islive = false;

  return (
    <div
      className={` select-none mx-auto relative ${
        isHorizantal
          ? "flex md:h-[170px]  w-[95%] md:w-[700px]"
          : "md:w-[290px] w-[300px] h-[273px]"
      } cursor-pointer rounded-[10px] overflow-hidden`}
    >
      <img
        className={`h-[167px]  rounded-[10px] ${
          isHorizantal ? " h-full md:w-[290px] w-[55%]" : "w-full"
        } `}
        src={thumbnailsURL}
        alt={channelName}
        loading="lazy"
      />
      <div className={isHorizantal ? "px-2" : "p-2"}>
        <div className="flex">
          {isHorizantal ? (
            ""
          ) : (
            <img
              src={channelIconURL}
              alt={channelName}
              loading="lazy"
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div className="ml-2 flex flex-col">
            <div className="flex">
              <h3 className="text-sm w-[95%] pt-0 md:text-xl font-bold line-clamp-2 text-slate-900">
                {videoTitle}
              </h3>
              <BsThreeDotsVertical
                className={
                  isHorizantal
                    ? "text-xl absolute right-1 hover:bg-red-300  bg-white top-1"
                    : "text-1xl"
                }
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex flex-col">
                <h4 className="line-clamp-1">{channelName}</h4>
                <div
                  className={`flex gap-2 w-full  whitespace-nowrap${
                    isHorizantal ? "flex-row " : "flex-row "
                  } text-[12px]   text-slate-600`}
                >
                  <span className="whitespace-nowrap">450 views</span>
                  <span className="whitespace-nowrap">4 months ago</span>
                </div>
                {isHorizantal && (
                  <p className="w-full line-clamp-2 text-[13px] md:text-xl">
                    {description}
                  </p>
                )}
              </div>
              {islive ? (
                <span className="bg-red-600 py-[2px] flex items-center justify-center h-fit px-3 text-center mb-0 text-white rounded">
                  Live
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

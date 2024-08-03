import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  thumbnailsURL,
  channelIconURL,
  channelName,
  videoTitle,
  description,
} from "../utils/constant";

import { formatViews } from "../utils/formatViews";
const VideoCard = ({ isHorizantal, item, setWatchLater }) => {
  const navigate = useNavigate();
  return (
    item.type == "video" && (
      <div
        onClick={() => navigate(`/video/${item?.video?.videoId}`)}
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
          src={item?.video?.thumbnails[0]?.url}
          alt={channelName}
          loading="lazy"
        />
        <div className={isHorizantal ? "px-2" : "p-2"}>
          <div className="flex">
            {isHorizantal ? (
              ""
            ) : (
              <img
                src={item?.video?.author?.avatar[0]?.url}
                alt={channelName}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div className="ml-2 flex flex-col">
              <div className="flex">
                <h3 className="text-sm w-[95%] pt-0 md:text-[17px] font-semibold line-clamp-2 text-slate-900">
                  {item?.video?.title}
                </h3>
                <BsThreeDotsVertical
                  onClick={() => {
                    setWatchLater((prev) => [...prev, item]);
                  }}
                  className={
                    isHorizantal
                      ? "text-xl absolute right-1 z-50 bg-white top-1"
                      : "text-xl z-50  bg-white"
                  }
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex flex-col">
                  <h4 className="line-clamp-1">{item?.video?.author?.title}</h4>
                  <div
                    className={`flex gap-2 w-full  whitespace-nowrap${
                      isHorizantal ? "flex-row " : "flex-row "
                    } text-[12px]   text-slate-600`}
                  >
                    <span className="whitespace-nowrap">
                      {item?.video?.isLiveNow
                        ? item?.video?.stats?.viewers + " watching"
                        : formatViews(item?.video?.stats?.views) + " views"}
                    </span>
                    <span className="whitespace-nowrap">
                      {item?.video?.publishedTimeText}
                    </span>
                  </div>
                  {isHorizantal && (
                    <p className="w-full line-clamp-2 text-[13px] md:text-xl">
                      {item?.video?.descriptionSnippet}
                    </p>
                  )}
                </div>
                {item?.video?.isLiveNow ? (
                  <span className="bg-red-600 absolute right-0 py-[2px] flex items-center justify-center h-fit px-3 text-center mb-0 text-white rounded">
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
    )
  );
};

export default VideoCard;

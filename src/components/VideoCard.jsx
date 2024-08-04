import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { formatViews } from "../utils/formatViews";
import { useDispatch } from "react-redux";

const VideoCard = ({ isHorizantal, item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handleAddToWatchLater = (e) => {
    e.stopPropagation();
    dispatch(addVideo((prev) => [...prev, item]));
  };
  console.log(item);

  return (
    item.type === "video" && (
      <div
        onClick={() => navigate(`/video/${item?.video?.videoId}`)}
        className={`select-none flex mx-auto relative ${
          isHorizantal
            ? "md:h-[170px] w-[95%] md:w-[600px] flex-row"
            : "md:w-[290px] w-[300px] h-[273px] flex-col"
        } cursor-pointer rounded-[10px]  overflow-hidden`}
      >
        <img
          className={`h-[167px] rounded-[10px] ${
            isHorizantal ? "h-full md:w-[290px] w-[55%]" : "w-full"
          } `}
          src={item?.video?.thumbnails[0]?.url}
          alt={item?.video?.author?.title}
          loading="lazy"
        />
        <div className={isHorizantal ? "px-1 md:px-2 py-0" : "p-2"}>
          <div className="flex">
            {isHorizantal ? (
              ""
            ) : (
              <img
                src={item?.video?.author?.avatar[0]?.url}
                alt={item?.video?.author?.title}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div className="ml-2 flex flex-col">
              <div className="flex relative">
                <h3 className="text-sm w-[95%] pt-0 md:text-[17px] font-semibold line-clamp-2 text-slate-900">
                  {item?.video?.title}
                </h3>
                <BsThreeDotsVertical
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  className={
                    isHorizantal
                      ? "text-xl absolute right-1 bg-white top-1"
                      : "text-xl bg-white"
                  }
                />
                {toggle ? (
                  <div className=" absolute p-3 bg-white">Save for later</div>
                ) : (
                  ""
                )}{" "}
              </div>
              <div className="flex items-end gap-2 ">
                <div className="flex flex-col">
                  <h4 className="line-clamp-1 font-poppins text-sm">
                    {item?.video?.author?.title}
                  </h4>
                  <div
                    className={`flex gap-2 w-full whitespace-nowrap ${
                      isHorizantal ? "flex-row" : "flex-col"
                    } text-[12px] text-slate-600`}
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
                    <p className="w-full line-clamp-2 md:line-clamp-3 text-[13px] md:text-[15px]">
                      {item?.video?.descriptionSnippet}
                    </p>
                  )}
                </div>
                {item?.video?.isLiveNow && (
                  <span className="bg-red-600 absolute right-0 py-[2px] flex items-center justify-center h-fit px-3 text-center mb-0 text-white rounded">
                    Live
                  </span>
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

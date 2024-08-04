import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { formatViews } from "../utils/formatViews";
import { useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { addVideo, removeVideo } from "../redux_Store/viewLaterVideoSlice"; // Adjust the import path as necessary
import { toast } from "react-toastify";

const VideoCard = ({ isHorizantal, item, add }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleBtn, setToggleBtn] = useState(false);

  const {
    video: {
      videoId,
      thumbnails,
      author: { avatar, title: authorTitle } = {},
      title: videoTitle,
      stats: { viewers, views } = {},
      publishedTimeText,
      isLiveNow,
      descriptionSnippet,
    } = {},
  } = item || {};

  const handleAddToWatchLater = (e) => {
    e.stopPropagation();
    dispatch(addVideo(item));
    toast.success("Added to watch later successfully");
    setToggleBtn(false);
  };

  const handleRemoveVideo = (e) => {
    e.stopPropagation();
    dispatch(removeVideo(videoId));
    toast.warning("Removed successfully");
    setToggleBtn(false);
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setToggleBtn(!toggleBtn);
  };

  return (
    item.type === "video" && (
      <div
        onClick={() => navigate(`/video/${videoId}`)}
        className={`select-none flex mx-auto relative ${
          isHorizantal
            ? "md:h-[170px] w-[95%] md:w-[600px] flex-row"
            : "md:w-[290px] w-[300px] h-[273px] flex-col"
        } cursor-pointer rounded-[10px] overflow-hidden`}
      >
        <img
          className={`h-[167px] rounded-[10px] ${
            isHorizantal ? "h-full md:w-[290px] w-[55%]" : "w-full"
          }`}
          src={thumbnails[0]?.url}
          alt={authorTitle}
          loading="lazy"
        />
        <div className={isHorizantal ? "px-1 md:px-2 py-0" : "p-2"}>
          <div className="flex">
            {!isHorizantal && (
              <img
                src={avatar[0]?.url}
                alt={authorTitle}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div className="ml-2 flex flex-col">
              <div className="flex relative">
                <h3 className="text-sm w-[95%] pt-0 md:text-[17px] font-semibold line-clamp-2 text-slate-900">
                  {videoTitle}
                </h3>
                <BsThreeDotsVertical
                  onClick={toggleOptions}
                  className={
                    isHorizantal
                      ? "text-xl absolute right-1 bg-white top-1"
                      : "text-xl bg-white"
                  }
                />
                {toggleBtn && (
                  <div className="absolute p-3 right-5 border rounded bg-white">
                    {add ? (
                      <div
                        className="flex justify-center items-center gap-2 text-[15px]"
                        onClick={handleAddToWatchLater}
                      >
                        <IoBookmarkOutline /> Save to watch later
                      </div>
                    ) : (
                      <div
                        className="flex justify-center items-center gap-2 text-[15px]"
                        onClick={handleRemoveVideo}
                      >
                        <MdDeleteOutline size={20} /> Delete
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-end gap-2">
                <div className="flex flex-col">
                  <h4 className="line-clamp-1 font-poppins text-sm">
                    {authorTitle}
                  </h4>
                  <div
                    className={`flex gap-2 w-full whitespace-nowrap ${
                      isHorizantal ? "flex-row" : "flex-col gap-0"
                    } text-[12px] text-slate-600`}
                  >
                    <span className="whitespace-nowrap">
                      {isLiveNow
                        ? viewers + " watching"
                        : formatViews(views) + " views"}
                    </span>
                    <span className="whitespace-nowrap">
                      {publishedTimeText}
                    </span>
                  </div>
                  {isHorizantal && (
                    <p className="w-full line-clamp-2 md:line-clamp-3 text-[13px] md:text-[15px]">
                      {descriptionSnippet}
                    </p>
                  )}
                </div>
                {isLiveNow && (
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

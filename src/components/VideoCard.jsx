import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { formatViews } from "../utils/formatViews";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { addVideo, removeVideo } from "../redux_Store/viewLaterVideoSlice";
import { toast } from "react-toastify";
import { setHistoryVideo } from "../redux_Store/historyVideoSlice";

/**
 * VideoCard component displays a video card with options for saving to watch later or deleting.
 * @param {Object} props - The component props
 * @param {boolean} props.isHorizantal - Determines if the layout is horizontal
 * @param {Object} props.item - The video item data
 * @param {boolean} props.add - Flag to determine if the card is for adding to watch later
 */
const VideoCard = ({ isHorizantal, item, add }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleBtn, setToggleBtn] = useState(false);
  const isLoggedIn = useSelector((state) => state.loggedStatus.isLoggedIn);

  // Destructure video data from props
  const {
    video: {
      videoId,
      thumbnails = [],
      author: { avatar = [], title: authorTitle } = {},
      title: videoTitle,
      stats: { viewers, views } = {},
      publishedTimeText,
      isLiveNow,
      descriptionSnippet,
    } = {},
  } = item || {};

  // Handles adding the video to the watch later list
  const handleAddToWatchLater = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      dispatch(addVideo(item));
      toast.success("Added to watch later successfully");
      setToggleBtn(false);
    } else {
      toast.error("Please sign in");
    }
  };

  // Handles removing the video from the watch later list
  const handleRemoveVideo = (e) => {
    e.stopPropagation();
    dispatch(removeVideo(videoId));
    toast.warning("Removed successfully");
    setToggleBtn(false);
  };

  // Toggles the visibility of the options menu
  const toggleOptions = (e) => {
    e.stopPropagation();
    setToggleBtn(!toggleBtn);
  };

  // Sets the video to history
  const setHistory = () => {
    if (isLoggedIn) {
      dispatch(setHistoryVideo(item));
    }
  };

  return (
    item.type === "video" && (
      <div
        onClick={() => {
          setHistory();
          navigate(`/video/${videoId}`);
        }}
        className={`select-none dark:bg-slate-800 dark:text-white flex mx-auto relative ${
          isHorizantal
            ? "md:h-[170px] w-[95%] md:w-[600px] flex-row"
            : "md:w-[290px] w-[300px] h-[273px] flex-col"
        } cursor-pointer rounded-[10px] overflow-hidden`}
      >
        {/* Video Thumbnail */}
        <img
          className={`h-[167px] rounded-[10px] ${
            isHorizantal ? "h-full md:w-[290px] w-[55%]" : "w-full"
          }`}
          src={thumbnails[0]?.url || "placeholder-image-url"}
          alt={authorTitle}
          loading="lazy"
        />
        <div className={isHorizantal ? "px-1 md:px-2 py-0" : "p-2"}>
          <div className="flex">
            {/* Author Avatar for Vertical Layout */}
            {!isHorizantal && avatar[0]?.url && (
              <img
                src={avatar[0]?.url || "placeholder-avatar-url"}
                alt={authorTitle}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div className="ml-2 flex flex-col">
              <div className="flex relative">
                {/* Video Title */}
                <h3 className="text-sm dark:text-white w-[95%] pt-0 md:text-[17px] font-semibold line-clamp-2 text-slate-900">
                  {videoTitle}
                </h3>
                {/* Options Button */}
                <BsThreeDotsVertical
                  onClick={toggleOptions}
                  className={`text-xl absolute right-1 ${
                    isHorizantal
                      ? "dark:bg-slate-800 dark:text-white bg-white top-1"
                      : "bg-white dark:bg-slate-800 dark:text-white"
                  }`}
                />
                {/* Options Menu */}
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
                  {/* Author Name */}
                  <h4 className="line-clamp-1 font-poppins text-sm dark:bg-slate-800 dark:text-white">
                    {authorTitle}
                  </h4>
                  {/* Video Stats */}
                  <div
                    className={`flex gap-2 w-full whitespace-nowrap ${
                      isHorizantal ? "flex-row" : "flex-col gap-0"
                    } text-[12px] text-slate-600`}
                  >
                    <span className="whitespace-nowrap dark:bg-slate-800 dark:text-slate-100">
                      {isLiveNow
                        ? `${viewers} watching`
                        : `${formatViews(views)} views`}
                    </span>
                    <span className="whitespace-nowrap dark:text-slate-100">
                      {publishedTimeText}
                    </span>
                  </div>
                  {/* Description for Horizontal Layout */}
                  {isHorizantal && (
                    <p className="w-full line-clamp-2 dark:bg-slate-800 dark:text-slate-50 md:line-clamp-3 text-[13px] md:text-[15px]">
                      {descriptionSnippet}
                    </p>
                  )}
                </div>
                {/* Live Badge */}
                {isLiveNow && (
                  <span className="bg-red-600 absolute right-0 py-[2px] dark:text-white items-center justify-center h-fit px-3 text-center mb-0 text-white rounded">
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

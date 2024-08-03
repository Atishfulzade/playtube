import React, { useState, useEffect } from "react";
import { Loader, Videos } from "../components";
import { BsThreeDotsVertical, BsDownload } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";

import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { fetchData } from "../utils/FetchData";
import { formatViews } from "../utils/formatViews";
import { formattedDate } from "../utils/formattedDate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";

const VideoDetail = () => {
  const { id } = useParams();
  const language = useSelector((state) => state.loggedStatus.language);
  const location = useSelector((state) => state.loggedStatus.country);

  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoPromise = fetchData(
          `video/details/?id=${id}&hl=${convertLanguage(
            language
          )}&gl=${convertCountryIntoCode(location)}`
        );
        const relatedPromise = fetchData(
          `video/related-contents/?id=${id}&hl=${convertLanguage(
            language
          )}&gl=${convertCountryIntoCode(location)}`
        );
        const commentsPromise = fetchData(
          `video/comments/?id=${id}&hl=${convertLanguage(
            language
          )}&gl=${convertCountryIntoCode(location)}`
        );
        const [videoResponse, relatedResponse, commentsResponse] =
          await Promise.all([videoPromise, relatedPromise, commentsPromise]);
        setVideoDetails(videoResponse);
        setRelatedVideo(relatedResponse);
        setComments(commentsResponse?.comments);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    fetchVideos();
  }, [id]);

  if (!videoDetails || !relatedVideo || !comments) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row w-full justify-start gap-10">
      <div className="w-full md:w-3/4 p-2">
        <div className="w-full h-[240px] md:h-[480px] bg-slate-500 rounded-md overflow-hidden">
          <ReactPlayer
            className="player"
            url={`https://www.youtube.com/watch?v=${id}`}
            playing={false}
            muted={false}
            controls
          />
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-[18px] md:text-[24px] mt-3 font-[500] text-slate-900">
            {videoDetails?.title}
          </h3>
          <BsThreeDotsVertical className="text-[24px]" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                navigate(`/channel/${videoDetails?.author?.channelId}`);
              }}
            >
              <img
                src={videoDetails?.author?.avatar[1].url}
                alt="user avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(`/channel/${videoDetails?.author?.channelId}`);
                  }}
                >
                  {videoDetails?.author?.title}
                </p>
                <p>
                  {formatViews(videoDetails?.author?.stats?.subscribers)}
                  &nbsp;subscribers
                </p>
              </div>
            </div>
            <button className="bg-slate-800 hover:bg-red-600 transition-colors text-white text-sm md:text-lg rounded-full px-5 py-[4px]">
              Subscribe
            </button>
          </div>
          <div className="flex gap-2 mb-5 md:mb-0">
            <div className="flex">
              <div
                onClick={() => setLikes(!likes)}
                className="flex cursor-pointer gap-1 text-[20px] px-3 h-[40px] items-center border border-[#b3b3b3] rounded-l-full"
              >
                <AiOutlineLike
                  className="cursor-pointer active:scale-125 transition-all"
                  fill={likes ? "red" : ""}
                />
                <span className="text-[16px] cursor-pointer select-none">
                  {formatViews(videoDetails?.stats?.likes)}
                </span>
              </div>
              <div className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-r-full flex items-center justify-center border-l-0">
                <AiOutlineDislike className="text-[20px]" />
              </div>
            </div>
            <div className="w-[40px] h-[40px] border select-none border-[#b3b3b3] rounded-full flex items-center justify-center">
              <AiOutlineShareAlt className="text-[20px] active:scale-110" />
            </div>
            <div className="w-fit h-[40px] text-[17px] px-4 border border-[#b3b3b3] rounded-full flex items-center justify-center">
              <IoBookmarkOutline /> save
            </div>
          </div>
        </div>
        {/* Video Description Section */}
        <div
          className={`bg-slate-200 rounded-md cursor-pointer p-5 relative transition-all ${
            descriptionVisible ? "h-fit " : " h-24 overflow-hidden"
          } mt-3`}
        >
          <div className="flex gap-3 text-[16px]">
            <p>{formatViews(videoDetails?.stats?.views)} views</p>
            <p>Upload on {formattedDate(videoDetails?.publishedDate)}</p>
          </div>
          <p
            className={`text-[#535353] w-full flex ${
              descriptionVisible ? "line-clamp-none" : "line-clamp-3"
            } flex-col overflow-hidden text-ellipsis`}
          >
            {videoDetails?.description}
          </p>

          <p className="flex flex-col">
            Tags:
            {videoDetails?.keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))}
          </p>
          {descriptionVisible ? (
            <span
              onClick={() => setDescriptionVisible(!descriptionVisible)}
              className="absolute bottom-2 right-3 px-2 bg-slate-200 font-semibold text-sm"
            >
              More
            </span>
          ) : (
            <span
              onClick={() => setDescriptionVisible(!descriptionVisible)}
              className="absolute bottom-3 right-3 px-3 bg-slate-200 font-semibold text-sm"
            >
              Show Less
            </span>
          )}
        </div>
        {/* Comment Section */}
        <div className="mt-4">
          {videoDetails?.stats?.comments && (
            <p className="text-[16px] md:text-[20px] font-semibold">
              {formatViews(videoDetails?.stats?.comments)} comments
            </p>
          )}
          {videoDetails?.stats?.comments
            ? comments.map((comm) => <Comments comm={comm} />)
            : "No comments available"}
        </div>
      </div>

      <div className="w-full md:w-1/4">
        <p className="text-[24px]">Suggested videos</p>
        <div className="mt-3">
          <Videos isHorizontal={true} videoData={relatedVideo?.contents} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;

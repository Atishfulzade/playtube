import React, { useState, useEffect } from "react";
import { Loader, Videos } from "../components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import Comments from "../components/Comments";
import { fetchData } from "../utils/FetchData";
import { formatViews } from "../utils/formatViews";
import { formattedDate } from "../utils/formattedDate";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeVideo, removeLikedVideo } from "../redux_Store/likedVideoSlice";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";

const VideoDetail = ({ setLeftSideBarOpen }) => {
  const { id } = useParams();
  const language = useSelector((state) => state.loggedStatus.language);
  const location = useSelector((state) => state.loggedStatus.country);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  useEffect(() => {
    setLeftSideBarOpen(false);
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
        setComments(commentsResponse?.comments || []);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    fetchVideos();
  }, [id, language, location, setLeftSideBarOpen]);

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(likeVideo(videoDetails));
    setLikes(true);
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    dispatch(removeLikedVideo(videoDetails?.id));
    setLikes(false);
  };

  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  if (!videoDetails || !relatedVideo || !comments) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-10">
      <div className="w-full md:w-3/4 p-2">
        {/* Video Player */}
        <div className="w-full h-[240px] md:h-[480px] bg-slate-500 rounded-md overflow-hidden">
          <ReactPlayer
            className="player"
            url={`https://www.youtube.com/watch?v=${id}`}
            playing={false}
            controls
          />
        </div>

        {/* Video Details */}
        <div className="flex items-center justify-between mt-3">
          <h3 className="text-[18px] md:text-[24px] font-[500] text-slate-900">
            {videoDetails?.title}
          </h3>
          <BsThreeDotsVertical className="text-[24px]" />
        </div>

        {/* Author and Interaction */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-3">
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() =>
                navigate(`/channel/${videoDetails?.author?.channelId}`)
              }
            >
              <img
                src={videoDetails?.author?.avatar[1]?.url}
                alt="user avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>{videoDetails?.author?.title}</p>
                <p>
                  {formatViews(videoDetails?.author?.stats?.subscribers)}{" "}
                  subscribers
                </p>
              </div>
            </div>
            <button className="bg-slate-800 hover:bg-red-600 transition-colors text-white text-sm md:text-lg rounded-full px-5 py-[4px]">
              Subscribe
            </button>
          </div>

          {/* Like, Dislike, Share, Save */}
          <div className="flex gap-2 mb-5 md:mb-0">
            <div className="flex items-center border border-[#b3b3b3] rounded-full">
              <div
                onClick={likes ? handleDislike : handleLike}
                className="flex items-center gap-1 text-[20px] px-3 h-[40px] cursor-pointer"
              >
                <AiOutlineLike fill={likes ? "red" : ""} />
                <span className="text-[16px]">
                  {formatViews(videoDetails?.stats?.likes)}
                </span>
              </div>
              <div className="w-[40px] h-[40px] border border-[#b3b3b3] flex items-center justify-center">
                <AiOutlineDislike className="text-[20px]" />
              </div>
            </div>
            <div className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center">
              <AiOutlineShareAlt className="text-[20px]" />
            </div>
            <div className="w-fit h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center">
              <IoBookmarkOutline /> save
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div
          className={`bg-slate-200 rounded-md p-5 relative transition-all mt-3 ${
            descriptionVisible ? "h-auto" : "h-24 overflow-hidden"
          }`}
        >
          <div className="flex gap-3 text-[16px]">
            <p>{formatViews(videoDetails?.stats?.views)} views</p>
            <p>Uploaded on {formattedDate(videoDetails?.publishedDate)}</p>
          </div>
          <p
            className={`text-[#535353] ${
              descriptionVisible ? "line-clamp-none" : "line-clamp-4"
            }`}
          >
            {videoDetails?.description}
          </p>
          <p className="flex flex-col mt-2">
            Tags:
            {videoDetails?.keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))}
          </p>
          <span
            onClick={toggleDescription}
            className="absolute bottom-3 right-3 px-3 bg-slate-200 font-semibold text-sm cursor-pointer"
          >
            {descriptionVisible ? "Show less" : "More"}
          </span>
        </div>

        {/* Comments Section */}
        <div className="mt-4">
          {videoDetails?.stats?.comments && (
            <p className="text-[16px] md:text-[20px] font-semibold">
              {formatViews(videoDetails?.stats?.comments)} comments
            </p>
          )}
          {comments.length > 0
            ? comments.map((comment) => (
                <Comments key={comment.id} comm={comment} />
              ))
            : "No comments available"}
        </div>
      </div>

      {/* Related Videos */}
      <div className="w-full md:w-1/4">
        <p className="text-[24px]">Suggested Videos</p>
        <div className="mt-3">
          <Videos
            isHorizantal={true}
            videoData={relatedVideo?.contents}
            add={true}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;

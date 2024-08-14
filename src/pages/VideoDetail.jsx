import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Loader, Videos, Comments } from "../components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import { fetchData } from "../utils/FetchData";
import { formatViews } from "../utils/formatViews";
import { formattedDate } from "../utils/formattedDate";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeVideo, removeLikedVideo } from "../redux_Store/likedVideoSlice";

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

  const fetchVideos = useCallback(async () => {
    try {
      const [videoResponse, relatedResponse, commentsResponse] =
        await Promise.all([
          fetchData(
            `video/details/?id=${id}&hl=${convertLanguage(
              language
            )}&gl=${convertCountryIntoCode(location)}`
          ),
          fetchData(
            `video/related-contents/?id=${id}&hl=${convertLanguage(
              language
            )}&gl=${convertCountryIntoCode(location)}`
          ),
          fetchData(
            `video/comments/?id=${id}&hl=${convertLanguage(
              language
            )}&gl=${convertCountryIntoCode(location)}`
          ),
        ]);

      setVideoDetails(videoResponse);
      setRelatedVideo(relatedResponse);
      setComments(commentsResponse?.comments || []);
    } catch (error) {
      console.error("Error fetching video data:", error.message);
    }
  }, [id, language, location]);

  useEffect(() => {
    setLeftSideBarOpen(false);
    fetchVideos();
  }, [id, language, location, fetchVideos, setLeftSideBarOpen]);

  const handleLike = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(likeVideo(videoDetails));
      setLikes(true);
    },
    [dispatch, videoDetails]
  );

  const handleDislike = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(removeLikedVideo(videoDetails?.id));
      setLikes(false);
    },
    [dispatch, videoDetails]
  );

  const toggleDescription = () => setDescriptionVisible(!descriptionVisible);

  const formattedTags = useMemo(
    () =>
      videoDetails?.keywords.map((keyword, index) => (
        <span key={index}>{keyword}</span>
      )),
    [videoDetails?.keywords]
  );

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
          <AuthorInfo author={videoDetails?.author} navigate={navigate} />
          <VideoInteractions
            likes={likes}
            handleLike={handleLike}
            handleDislike={handleDislike}
            videoStats={videoDetails?.stats}
          />
        </div>

        {/* Video Description */}
        <VideoDescription
          views={videoDetails?.stats?.views}
          publishedDate={videoDetails?.publishedDate}
          description={videoDetails?.description}
          descriptionVisible={descriptionVisible}
          toggleDescription={toggleDescription}
          tags={formattedTags}
        />

        {/* Comments Section */}
        <CommentsSection
          comments={comments}
          commentCount={videoDetails?.stats?.comments}
        />
      </div>

      {/* Related Videos */}
      <RelatedVideos relatedVideo={relatedVideo} />
    </div>
  );
};

const AuthorInfo = ({ author, navigate }) => (
  <div className="flex items-center gap-10">
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate(`/channel/${author?.channelId}`)}
    >
      <img
        src={author?.avatar[1]?.url}
        alt="user avatar"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p>{author?.title}</p>
        <p>{formatViews(author?.stats?.subscribers)} subscribers</p>
      </div>
    </div>
    <button className="bg-slate-800 hover:bg-red-600 transition-colors text-white text-sm md:text-lg rounded-full px-5 py-[4px]">
      Subscribe
    </button>
  </div>
);

const VideoInteractions = ({
  likes,
  handleLike,
  handleDislike,
  videoStats,
}) => (
  <div className="flex gap-2 mb-5 md:mb-0">
    <div className="flex items-center border border-[#b3b3b3] rounded-full">
      <div
        onClick={likes ? handleDislike : handleLike}
        className="flex items-center gap-1 text-[20px] px-3 h-[40px] cursor-pointer"
      >
        <AiOutlineLike fill={likes ? "red" : ""} />
        <span className="text-[16px]">{formatViews(videoStats?.likes)}</span>
      </div>
      <div className="w-[40px] h-[40px] border border-[#b3b3b3] flex items-center justify-center">
        <AiOutlineDislike className="text-[20px]" />
      </div>
    </div>
    <div className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center">
      <AiOutlineShareAlt className="text-[20px]" />
    </div>
    <div className="w-fit h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center">
      <IoBookmarkOutline /> Save
    </div>
  </div>
);

const VideoDescription = ({
  views,
  publishedDate,
  description,
  descriptionVisible,
  toggleDescription,
  tags,
}) => (
  <div
    className={`bg-slate-200 rounded-md p-5 relative transition-all mt-3 ${
      descriptionVisible ? "h-auto" : "h-24 overflow-hidden"
    }`}
  >
    <div className="flex gap-3 text-[16px]">
      <p>{formatViews(views)} views</p>
      <p>Uploaded on {formattedDate(publishedDate)}</p>
    </div>
    <p
      className={`text-[#535353] ${
        descriptionVisible ? "line-clamp-none" : "line-clamp-4"
      }`}
    >
      {description}
    </p>
    <p className="flex flex-col mt-2">Tags: {tags}</p>
    <span
      onClick={toggleDescription}
      className="absolute bottom-3 right-3 px-3 bg-slate-200 font-semibold text-sm cursor-pointer"
    >
      {descriptionVisible ? "Show less" : "More"}
    </span>
  </div>
);

const CommentsSection = ({ comments, commentCount }) => (
  <div className="mt-4">
    {commentCount && (
      <p className="text-[16px] md:text-[20px] font-semibold">
        {formatViews(commentCount)} comments
      </p>
    )}
    {comments?.length > 0
      ? comments?.map((comment) => <Comments key={comment.id} comm={comment} />)
      : "No comments available"}
  </div>
);

const RelatedVideos = ({ relatedVideo }) => (
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
);

export default VideoDetail;

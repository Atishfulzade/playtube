import React, { useState } from "react";
import { Videos } from "../components";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";

const VideoDetail = () => {
  const { id } = useParams();
  console.log(id);
  const description =
    "In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ullamcorper ex a nibh pretium, sed dignissim ex euismod. Maecenas ac pulvinar tortor. Morbi lorem augue, maximus at gravida non, gravida id dui. Maecenas odio ex, ornare eu eleifend non, feugiat id nisl. Praesent eget nisl auctor, fringilla ante quis, condimentum lacus. Nullam ac consectetur massa, egestas semper magna. Quisque imperdiet, magna vel auctor commodo, orci ipsum commodo arcu, a molestie est ex non orci. Donec a mauris id tortor facilisis varius ultrices eget tellus. Phasellus eget euismod tellus. Fusce tincidunt ultrices erat eget consequat. Aliquam arcu risus, fringilla vehicula fringilla sed, lacinia eu leo.";

  const [fullDescription, setFullDescription] = useState(false);
  function getFullDescription() {
    setFullDescription(true);
  }

  return (
    <div className="flex flex-col md:flex-row w-full justify-start gap-10 ">
      <div className="w-full md:w-3/4 p-2">
        <div className="w-full h-[240px] md:h-[480px] bg-slate-500 rounded">
          <ReactPlayer
            className="player"
            url={["https://www.youtube.com/watch?v=f7Ss2BMpDnI"]}
            controls={true}
          />
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] md:text-[24px] mt-3 font-[500] text-slate-900">
            Aliquip qui culpa commodo incididunt ullamco non duis n...
          </h3>
          <BsThreeDotsVertical className="text-[24px]" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <img
                src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                alt="user avatar"
                className="w-[56px] h-[56px] rounded-full"
              />
              <div>
                <p>Channel Name</p>
                <p>84.6M Subsriber</p>
              </div>
            </div>
            <button className="bg-slate-800 hover:bg-red-600 transition-colors  text-white text-sm md:text-lg  rounded-full px-5 py-[4px] ">
              Subscribe
            </button>
          </div>
          <div className="flex gap-2 mb-5 md:mb-0 ">
            <div className="flex">
              <div className="flex gap-1 text-[20px] px-3 h-[40px] items-center border border-[#b3b3b3] rounded-l-full">
                <AiOutlineLike className="" />
                <span className="text-[16px]">869</span>
              </div>
              <div className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-r-full flex items-center justify-center border-l-0">
                <AiOutlineDislike className="text-[20px]" />
              </div>
            </div>
            <div className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center">
              <AiOutlineShareAlt className="text-[20px]" />
            </div>
            <div className="w-[40px] h-[40px] border border-[#b3b3b3] rounded-full flex items-center justify-center">
              <BsDownload className="text-[20px]" />
            </div>
          </div>
        </div>
        {/* Video Description Section*/}
        <div className="bg-[#eaeaea] rounded-md p-2">
          <div className="flex gap-3 text-[16px]">
            <p>87542</p>
            <p>18 hours ago</p>
            <p>#video#song#comedy</p>
          </div>
          <p className="text-[#535353]">
            {fullDescription
              ? description
              : description.substring(0, 300) + "..."}

            <span
              className={`text-slate-600 ml-3 ${
                fullDescription ? "hidden" : ""
              }`}
              onClick={getFullDescription}
            >
              More
            </span>
          </p>
        </div>
        {/* Comment Section */}
        <div className="mt-4">
          <p className="text-[16px] md:text-[20px] font-semibold">
            28 Comments
          </p>
          <div className="flex items-center gap-2">
            <img
              src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
              alt="user avatar"
              className="w-[48px] h-[48px] rounded-full"
            />
            <input
              placeholder="Add a comment..."
              className="outline-none border-b-[1px] w-full border-[#535353]"
            />
          </div>

          <Comments />
          <Comments />
          <Comments />
        </div>
      </div>

      <div className="w-full md:w-1/4">
        <p className="text-[24px]">Suggested videos</p>
        <div className="mt-3">
          <Videos isHorizantal={true} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;

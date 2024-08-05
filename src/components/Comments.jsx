import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Comments = ({ comm }) => {
  const navigate = useNavigate(); //for navigation

  return (
    <div className="my-5 dark:bg-slate-800 dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={comm?.author?.avatar[0]?.url}
            alt="user avatar"
            className="w-[48px] cursor-pointer h-[48px] rounded-full"
            onClick={() => {
              navigate(`/channel/${comm?.author?.channelId}`);
            }}
          />
          <div>
            <p>
              {comm?.author?.title}
              <span className="ml-3">{comm?.publishedTimeText} </span>
            </p>
            <p>{comm.content}</p>
          </div>
        </div>
        <div></div>
      </div>

      <div className="px-[60px]">
        <div className="flex items-center gap-2 ">
          <div className="flex gap-[2px] text-[18px] h-[40px] items-center ">
            <AiOutlineLike className="" />
            <span className="text-[14px]">{comm?.stats?.votes}</span>
          </div>
          <div className="text-[14px] ml-5 cursor-pointer">
            {comm?.stats?.replies} replies
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

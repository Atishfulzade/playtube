import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Comments = () => {
  const [reply, setReplay] = useState(false);
  function currentReplay() {
    setReplay(!reply);
  }

  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
            alt="user avatar"
            className="w-[48px] h-[48px] rounded-full"
          />
          <div>
            <p>
              @skyideas4294 <span className="ml-1">3 hourse ago </span>
            </p>
            <p>what a performance both the bowler and the commentators</p>
          </div>
        </div>
        <div>
          <BsThreeDotsVertical className="text-[24px]" />
        </div>
      </div>

      <div className="px-[60px]">
        <div className="flex items-center gap-2 ">
          <div className="flex gap-[2px] text-[18px] h-[40px] items-center ">
            <AiOutlineLike className="" />
            <span className="text-[14px]">14</span>
          </div>
          <AiOutlineDislike className="text-[18px]" />
          <div className="text-[14px] cursor-pointer" onClick={currentReplay}>
            Reply
          </div>
        </div>
        {reply && (
          <div>
            <div className="flex items-center gap-2">
              <img
                src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                alt="user avatar"
                className="w-[32px] h-[32px] rounded-full"
              />
              <input
                placeholder="Add a Replay..."
                className="outline-none border-b-[1px] w-full text-[14px] border-[#535353] py-1"
              />
            </div>
            <div className="flex mt-[6px] items-center justify-end">
              <p className="w-[80px] text-[14px] rounded-full text-center py-1  hover:bg-slate-200 active:bg-slate-200 ">
                Cancel
              </p>
              <p className="w-[80px] text-[14px] rounded-full text-center py-1  hover:bg-slate-200">
                Reply
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;

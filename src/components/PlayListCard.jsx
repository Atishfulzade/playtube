import React from "react";
import { formattedDate } from "../utils/formattedDate";
import { BsThreeDotsVertical } from "react-icons/bs";

const PlayListCard = ({ data }) => {
  console.log(data);

  return (
    <div
      onClick={() => navigate(`/video/${item?.video?.videoId}`)}
      className={` select-none mx-auto  relative  md:w-[290px] w-[300px] h-[273px]cursor-pointer rounded-[10px] overflow-hidden`}
    >
      <img
        className={`h-[167px]  rounded-[10px]  w-full`}
        src={data?.playlist?.thumbnails[0]?.url}
        alt={data?.title}
        loading="lazy"
      />
      <div className="px-2">
        <div className="flex">
          <div className="ml-2 flex flex-col">
            <div className="flex">
              <h3 className="text-sm w-[95%] pt-0 md:text-[17px] font-semibold line-clamp-2 text-slate-900">
                {data?.playlist?.title}
              </h3>
              <BsThreeDotsVertical className="text-xl absolute right-1 hover:bg-red-300  bg-white top-1" />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex flex-col">
                <div
                  className={`flex gap-2 w-full  whitespace-nowrap text-[12px]   text-slate-600`}
                >
                  <span className="whitespace-nowrap">
                    {/* {formattedDate(data?.playlist?.updatedTime)} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayListCard;

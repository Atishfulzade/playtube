import React, { useState } from "react";
import { Videos } from "../components";
import {
  channelIconURL,
  channelName,
  description,
  thumbnailsURL,
} from "../utils/constant";
function ChannelDetails({}) {
  const [tab, setTab] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  function channelTab(id) {
    setTab(id);
  }
  const openDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full p-1 md:p-3">
        <img
          src={thumbnailsURL}
          alt="banner pic"
          className="w-full h-24 md:h-40 object-cover rounded-2xl"
        />
        <div className="flex my-8">
          <img
            src={channelIconURL}
            alt="profile pic"
            className="w-[120px] h-[120px] md:h-[200px] rounded-full md:w-[200px] "
          />
          <div className="md:pl-10 pl-3 md:pr-4 pr-1">
            <p className="text-[30px] md:text-4xl lg:text-5xl font-semibold text-slate-800  ">
              {channelName}
            </p>
            <div className="flex md:gap-6 gap-3 mt-2 whitespace-nowrap">
              <span>6.4M Subscribers</span>
              <span>254 Videos</span>
            </div>
            <p
              onClick={openDescription}
              className={`text-sm cursor-pointer   md:text-xl  text-slate-700 md:leading-6 ${
                isDescriptionOpen
                  ? "max-h-60 line-clamp-none w-full overflow-y-auto"
                  : "line-clamp-3"
              }`}
            >
              {description}
            </p>
            <button className="bg-slate-800 hover:bg-red-600 transition-colors  text-white text-sm md:text-xl  rounded-full px-6 py-2 mt-4">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <ul class="text-black text-sm md:text-xl mb-5 font-bold flex border-b-[1px] border-slate-200">
        <li
          onClick={() => channelTab(1)}
          class={`mx-[15px] cursor-pointer ${
            tab === 1 ? "border-b-[3px] border-red-500" : ""
          } `}
        >
          Home
        </li>
        <li
          onClick={() => channelTab(2)}
          class={`mx-[15px] cursor-pointer ${
            tab === 2 ? "border-b-[3px] border-red-500" : ""
          } `}
        >
          Videos
        </li>
        <li
          onClick={() => channelTab(3)}
          class={`mx-[15px] cursor-pointer ${
            tab === 3 ? "border-b-[3px] border-red-500" : ""
          } `}
        >
          Playlist
        </li>
      </ul>

      <div>
        <div className={tab === 1 ? "block" : "hidden"}>
          <Videos />
        </div>
        <div className={tab === 2 ? "block" : "hidden"}>2</div>
        <div className={tab === 3 ? "block" : "hidden"}>3</div>
      </div>
    </div>
  );
}

export default ChannelDetails;

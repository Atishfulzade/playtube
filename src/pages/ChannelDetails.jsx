import React, { useState, useEffect } from "react";
import { Loader, Videos } from "../components";
import { IoLocationOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import {
  channelIconURL,
  channelName,
  description,
  thumbnailsURL,
} from "../utils/constant";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/FetchData";
import { formatViews } from "../utils/formatViews";
import PlayListCard from "../components/PlayListCard";
import { useSelector } from "react-redux";
function ChannelDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState(1);
  const [channelDetail, setChannelDetail] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelPlaylists, setChannelPlaylists] = useState([]);

  function channelTab(num) {
    setTab(num);
  }
  const openDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const channelPromise = await fetchData(
          `channel/details/?id=${id}&hl=en&gl=US`
        );
        const videoPromise = await fetchData(
          `channel/videos/?id=${id}&filter=videos_latest&hl=en&gl=US`
        );
        const playlistPromise = await fetchData(
          `channel/playlists/?id=${id}&filter=created_playlists_newest&hl=en&gl=US`
        );
        const [channelResponse, videosResponse, playlistResponse] =
          await Promise.all([channelPromise, videoPromise, playlistPromise]);
        setChannelVideos(videosResponse?.contents);
        setChannelPlaylists(playlistResponse?.contents);
        setChannelDetail(channelResponse);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    fetchVideos();
  }, []);
  console.log(channelVideos);
  if (!channelDetail || !channelVideos || !channelPlaylists) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full p-1 md:p-3">
        <img
          src={channelDetail?.banner?.desktop[4]?.url}
          alt="banner pic"
          className="w-full h-24 md:h-40 object-cover rounded-2xl"
        />
        <div className="flex my-8">
          <img
            src={channelDetail?.avatar[0]?.url}
            alt="profile pic"
            className="w-[120px] h-[120px] md:h-[200px] rounded-full md:w-[200px] "
          />
          <div className="md:pl-10 pl-3  md:pr-4 pr-1">
            <p className="text-[30px] flex items-center gap-2 md:text-4xl lg:text-5xl font-semibold text-slate-800  ">
              {channelDetail?.title}{" "}
              {channelDetail?.isVerified && (
                <span className="text-sm">
                  <RiVerifiedBadgeFill fill="#4F8FF6" />
                </span>
              )}
            </p>
            <div className="flex justify-between">
              <span>{channelDetail?.username}</span>
              <span className="flex gap-2 items-center">
                <IoLocationOutline />
                {channelDetail?.country}
              </span>
            </div>

            <div className="flex md:gap-6 gap-3 mt-2 whitespace-nowrap">
              <span>
                {formatViews(channelDetail?.stats?.subscribers)} subscribers
              </span>
              <span>{channelDetail?.stats?.videos} videos</span>
            </div>
            <p
              onClick={openDescription}
              className={`text-sm cursor-pointer   md:text-xl  text-slate-700 md:leading-6 ${
                isDescriptionOpen
                  ? "max-h-60 line-clamp-none w-full text-ellipsis overflow-y-auto"
                  : "line-clamp-3"
              }`}
            >
              {channelDetail?.description}
              Tags:
              {channelDetail?.keywords &&
                channelDetail?.keywords.map((keyword, i) => (
                  <span className="flex flex-col" key={i}>
                    {keyword}
                  </span>
                ))}
            </p>
            <button className="bg-slate-800 hover:bg-red-600 transition-colors  text-white text-sm md:text-xl  rounded-full px-6 py-2 mt-4">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <ul className="text-black text-sm md:text-xl mb-5 font-bold flex border-b-[1px] border-slate-200">
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
          className={`mx-[15px] cursor-pointer ${
            tab === 2 ? "border-b-[3px] border-red-500" : ""
          } `}
        >
          Videos
        </li>
        <li
          onClick={() => channelTab(3)}
          className={`mx-[15px] cursor-pointer ${
            tab === 3 ? "border-b-[3px] border-red-500" : ""
          } `}
        >
          Playlist
        </li>
      </ul>

      <div>
        <div className={tab === 1 ? "block" : "hidden"}>
          <Videos videoData={channelVideos} />
        </div>
        <div className={tab === 2 ? "block" : "hidden"}>2</div>
        <div className={tab === 3 ? "block" : "hidden"}>
          <div className="flex flex-wrap gap-3">
            {channelPlaylists.map((data) => (
              <PlayListCard data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelDetails;

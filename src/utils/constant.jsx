import { GoHome } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { BsPostcard } from "react-icons/bs";

const thumbnailsURL =
  "https://images.unsplash.com/photo-1719937206109-7f4e933230c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const channelName = "Rocking coder";
const channelIconURL =
  "https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const description =
  "Hello Developers,Here we learn how to add or insert new elements in the array of data structure and algorithms with javaScript in the Hindi language. there we cover all topics and operations of DSA in javascript.Array Insert element in JS javascript data structureUnderstand issue and solution with WhiteboardMake array, define the position. Use Loop to insert new element Insert element with text input and button.Insert Element with by default function.";
const videoTitle =
  "DSA with JavaScript in Hindi #3 Insert element in array JS | Data Structure";
const categories = [
  "All",
  "Music",
  "News",
  "Jukebox",
  "Hindi song",
  "Gazals",
  "Mixes",
  "Comedy",
  "Show",
  "Movies",
  "Indian idol",
  "Mansoon",
  "Marathi song",
  "Kashmir",
  "Marathi song",
  "Kashmir",
];
const leftSidebar = [
  { icon: <GoHome size={24} />, title: "Home", path: "/" },
  { icon: <BsPostcard size={24} />, title: "Post", path: "post" },
  { icon: <GoHistory size={24} />, title: "History", path: "history" },
  { icon: <BsClock size={24} />, title: "Watch later", path: "view_later" },
  { icon: <BiLike size={24} />, title: "Liked videos", path: "liked_video" },
];

const sidebarMobileMenu = [
  { icon: <GoHistory size="20" />, name: "History", path: "history" },
  { icon: <BsPostcard size="20" />, name: "Post", path: "post" },
  { icon: <AiOutlineHome size="20" />, name: "Home", path: "/" },
  {
    icon: <AiOutlineLike size="20" />,
    name: "Liked videos",
    path: "liked_video",
  },
  { icon: <BsClock size={20} />, name: "Watch later", path: "view_later" },
];

export {
  thumbnailsURL,
  channelName,
  channelIconURL,
  description,
  videoTitle,
  categories,
  sidebarMobileMenu,
  leftSidebar,
};

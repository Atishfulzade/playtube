import { GoHome } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { BsPostcard } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { MdOutlineMovie } from "react-icons/md";
import { GoBroadcast } from "react-icons/go";
import { IoGameControllerOutline } from "react-icons/io5";
import { PiNewspaperClipping } from "react-icons/pi";
import { GoTrophy } from "react-icons/go";
import { PiDress } from "react-icons/pi";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { PiLightbulbFilamentLight } from "react-icons/pi";
import { TbBrandGooglePodcasts } from "react-icons/tb";
import { SiYoutubeshorts } from "react-icons/si";

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
  { name: "All", query: "All" },
  { name: "Music", query: "music" },
  { name: "News", query: "news" },
  { name: "Jukebox", query: "jukebox" },
  { name: "Hindi song", query: "hindi song" },
  { name: "Gazals", query: "gazals" },
  { name: "Mixes", query: "mixes" },
  { name: "Comedy", query: "comedy" },
  { name: "Show", query: "show" },
  { name: "Movies", query: "movies" },
  { name: "Indian idol", query: "indian idol" },
  { name: "Monsoon", query: "monsoon" },
  { name: "Marathi song", query: "marathi song" },
  { name: "Kashmir", query: "kashmir" },
  { name: "Gaming", query: "gaming" },
  { name: "Vlogs", query: "vlogs" },
  { name: "Tech Reviews", query: "tech reviews" },
  { name: "Education", query: "education" },
  { name: "Tutorials", query: "tutorials" },
  { name: "Fitness", query: "fitness" },
  { name: "Travel", query: "travel" },
  { name: "DIY", query: "diy" },
  { name: "Food", query: "food" },
  { name: "ASMR", query: "asmr" },
  { name: "Pets", query: "pets" },
  { name: "Sports", query: "sports" },
  { name: "Science", query: "science" },
  { name: "Movies Trailers", query: "movies trailers" },
  { name: "Interviews", query: "interviews" },
  { name: "Podcasts", query: "podcasts" },
  { name: "Motivation", query: "motivation" },
  { name: "Reviews", query: "reviews" },
  { name: "Health", query: "health" },
  { name: "Finance", query: "finance" },
  { name: "Automotive", query: "automotive" },
  { name: "Animation", query: "animation" },
  { name: "Live Streams", query: "live streams" },
  { name: "Documentaries", query: "documentaries" },
  { name: "Shorts", query: "shorts" },
];

const leftSidebarMenu1 = [
  { icon: <GoHome size={24} />, title: "Home", path: "/" },
  { icon: <SiYoutubeshorts size={24} />, title: "Shorts", path: "shorts" },
];
const leftSidebarMenu2 = [
  { icon: <GoHistory size={24} />, title: "History", path: "history" },
  { icon: <BsClock size={24} />, title: "Watch later", path: "view_later" },
  { icon: <BiLike size={24} />, title: "Liked videos", path: "liked_video" },
];
const exploreMenu = [
  { icon: <AiOutlineFire size={24} />, title: "Trending", path: "trending" },
  {
    icon: <AiOutlineShopping size={24} />,
    title: "Shopping",
    path: "shopping",
  },
  { icon: <HiOutlineMusicalNote size={24} />, title: "Music", path: "music" },
  { icon: <MdOutlineMovie size={24} />, title: "Movies", path: "movies" },
  { icon: <GoBroadcast size={24} />, title: "Live", path: "live" },
  {
    icon: <IoGameControllerOutline size={24} />,
    title: "Gaming",
    path: "gaming",
  },
  { icon: <PiNewspaperClipping size={24} />, title: "News", path: "news" },
  { icon: <GoTrophy size={24} />, title: "Sports", path: "sport" },
  {
    icon: <PiLightbulbFilamentLight size={24} />,
    title: "Courses",
    path: "courses",
  },
  {
    icon: <PiDress size={24} />,
    title: "Fashion & Beauty",
    path: "fashion&beauty",
  },
  {
    icon: <TbBrandGooglePodcasts size={24} />,
    title: "Podcasts",
    path: "podcast",
  },
  {
    icon: <MdOutlineTheaterComedy size={24} />,
    title: "Comedy",
    path: "comedy",
  },
];

const sidebarMobileMenu = [
  {
    icon: <GoHistory size="20" />,
    name: "History",
    path: "history",
    access: false,
  },
  { icon: <BsPostcard size="20" />, name: "Post", path: "post", access: true },
  { icon: <AiOutlineHome size="20" />, name: "Home", path: "/", access: true },
  {
    icon: <AiOutlineLike size="20" />,
    name: "Liked videos",
    path: "liked_video",
    access: false,
  },
  {
    icon: <BsClock size={20} />,
    name: "Watch later",
    path: "view_later",
    access: false,
  },
];
const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Brazil", code: "BR" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cabo Verde", code: "CV" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, Democratic Republic of the", code: "CD" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Grenada", code: "GD" },
  { name: "Guatemala", code: "GT" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Honduras", code: "HN" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People's Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People's Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia (Federated States of)", code: "FM" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine, State of", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
];
const languages = [
  { name: "Arabic", code: "ar" },
  { name: "Assamese", code: "as" },
  { name: "Bengali", code: "bn" },
  { name: "Dutch", code: "nl" },
  { name: "English", code: "en" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Gujarati", code: "gu" },
  { name: "Hindi", code: "hi" },
  { name: "Italian", code: "it" },
  { name: "Japanese", code: "ja" },
  { name: "Kannada", code: "kn" },
  { name: "Kashmiri", code: "ks" },
  { name: "Korean", code: "ko" },
  { name: "Malayalam", code: "ml" },
  { name: "Mandarin Chinese", code: "zh" },
  { name: "Marathi", code: "mr" },
  { name: "Persian", code: "fa" },
  { name: "Portuguese", code: "pt" },
  { name: "Punjabi", code: "pa" },
  { name: "Russian", code: "ru" },
  { name: "Sanskrit", code: "sa" },
  { name: "Spanish", code: "es" },
  { name: "Swahili", code: "sw" },
  { name: "Tamil", code: "ta" },
  { name: "Telugu", code: "te" },
  { name: "Thai", code: "th" },
  { name: "Turkish", code: "tr" },
  { name: "Urdu", code: "ur" },
  { name: "Vietnamese", code: "vi" },
];
const deviceTheme = [{ name: "Dark theme" }, { name: "Light theme" }];
export {
  thumbnailsURL,
  channelName,
  channelIconURL,
  countries,
  deviceTheme,
  description,
  languages,
  exploreMenu,
  videoTitle,
  categories,
  sidebarMobileMenu,
  leftSidebarMenu1,
  leftSidebarMenu2,
};

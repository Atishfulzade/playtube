import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./redux_Store/windowSizeSlice";
import {
  ChannelDetails,
  Feed,
  SearchFeed,
  VideoDetail,
  History,
  WatchLater,
  LikedVideos,
  Post,
  ErrorPage,
} from "./pages";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const checkWindowSize = () => {
    const isMobile = window.innerWidth <= 768;
    dispatch(setIsMobile(isMobile));
  };
  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="search/:searchTerm" element={<SearchFeed />} />
          <Route path="channel/:id" element={<ChannelDetails />} />
          <Route path="video/:id" element={<VideoDetail />} />
          <Route path="history" element={<History />} />
          <Route path="view_later" element={<WatchLater />} />
          <Route path="liked_video" element={<LikedVideos />} />
          <Route path="post" element={<Post />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

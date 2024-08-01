import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
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
import { AuthenticationPage } from "./components";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loggedStatus.isLoggedIn);

  // Function to check window size
  const checkWindowSize = () => {
    const isMobile = window.innerWidth <= 768;
    dispatch(setIsMobile(isMobile));
  };

  // Handle authentication state change

  // Handle window resize event
  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="search/:searchTerm" element={<SearchFeed />} />
          <Route path="channel/:id" element={<ChannelDetails />} />
          <Route path="video/:id" element={<VideoDetail />} />
          <Route path="history" element={<History />} />
          <Route path="view_later" element={<WatchLater />} />
          <Route path="liked_video" element={<LikedVideos />} />
          {!isLoggedIn && (
            <Route path="authenticate" element={<AuthenticationPage />} />
          )}
          <Route path="post" element={<Post />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

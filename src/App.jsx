import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import { setIsMobile } from "./redux_Store/windowSizeSlice";
import { lazy, Suspense } from "react";
import { AuthenticationPage, Loader } from "./components";

// Lazy load pages
const ChannelDetails = lazy(() => import("./pages/ChannelDetails"));
const Feed = lazy(() => import("./pages/Feed"));
const SearchFeed = lazy(() => import("./pages/SearchFeed"));
const VideoDetail = lazy(() => import("./pages/VideoDetail"));
const History = lazy(() => import("./pages/History"));
const WatchLater = lazy(() => import("./pages/WatchLater"));
const LikedVideos = lazy(() => import("./pages/LikedVideos"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Post = lazy(() => import("./pages/Post"));

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loggedStatus.isLoggedIn);
  const [leftSideBarOpen, setLeftSideBarOpen] = useState(true);
  // Function to check window size
  const checkWindowSize = () => {
    const isMobile = window.innerWidth <= 768;
    dispatch(setIsMobile(isMobile));
  };

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
        <Route
          path="/"
          element={
            <Layout
              leftSideBarOpen={leftSideBarOpen}
              setLeftSideBarOpen={setLeftSideBarOpen}
            />
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Feed
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="search/:searchTerm"
            element={
              <Suspense fallback={<Loader />}>
                <SearchFeed
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="channel/:id"
            element={
              <Suspense fallback={<Loader />}>
                <ChannelDetails
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="video/:id"
            element={
              <Suspense fallback={<Loader />}>
                <VideoDetail
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="history"
            element={
              <Suspense fallback={<Loader />}>
                <History
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="view_later"
            element={
              <Suspense fallback={<Loader />}>
                <WatchLater
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="liked_video"
            element={
              <Suspense fallback={<Loader />}>
                <LikedVideos
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          {!isLoggedIn && (
            <Route path="authenticate" element={<AuthenticationPage />} />
          )}
          <Route
            path="post"
            element={
              <Suspense fallback={<Loader />}>
                <Post
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <ErrorPage
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

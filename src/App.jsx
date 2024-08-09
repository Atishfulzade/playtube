import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import { setIsMobile } from "./redux_Store/windowSizeSlice";
import { lazy, Suspense } from "react";
import { AuthenticationPage, Loader } from "./components";
import { Comedy } from "./pages";

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
const Trending = lazy(() => import("./pages/Trending"));
const Shopping = lazy(() => import("./pages/Shopping"));
const Music = lazy(() => import("./pages/Music"));
const Movies = lazy(() => import("./pages/Movies"));
const Live = lazy(() => import("./pages/Live"));
const Gaming = lazy(() => import("./pages/Gaming"));
const News = lazy(() => import("./pages/News"));
const Sports = lazy(() => import("./pages/Sports"));
const Course = lazy(() => import("./pages/Course"));
const Fashion = lazy(() => import("./pages/Fashion"));
const Podcast = lazy(() => import("./pages/Podcast"));
const Camedy = lazy(() => import("./pages/Comedy"));

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
            path="shorts"
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
            path="trending"
            element={
              <Suspense fallback={<Loader />}>
                <Trending
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="shopping"
            element={
              <Suspense fallback={<Loader />}>
                <Shopping
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="music"
            element={
              <Suspense fallback={<Loader />}>
                <Music
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="Movies"
            element={
              <Suspense fallback={<Loader />}>
                <Movies
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="live"
            element={
              <Suspense fallback={<Loader />}>
                <Live
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="gaming"
            element={
              <Suspense fallback={<Loader />}>
                <Gaming
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="news"
            element={
              <Suspense fallback={<Loader />}>
                <News
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="sport"
            element={
              <Suspense fallback={<Loader />}>
                <Sports
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="courses"
            element={
              <Suspense fallback={<Loader />}>
                <Course
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="fashion&beauty"
            element={
              <Suspense fallback={<Loader />}>
                <Fashion
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="podcast"
            element={
              <Suspense fallback={<Loader />}>
                <Podcast
                  leftSideBarOpen={leftSideBarOpen}
                  setLeftSideBarOpen={setLeftSideBarOpen}
                />
              </Suspense>
            }
          />
          <Route
            path="comedy"
            element={
              <Suspense fallback={<Loader />}>
                <Comedy
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

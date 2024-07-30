import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import {
  ChannelDetails,
  Feed,
  SearchFeed,
  VideoDetail,
  History,
  WatchLater,
  LikedVideos,
  Post,
} from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="search/:searchFeed" element={<SearchFeed />} />
          <Route path="channel/:id" element={<ChannelDetails />} />
          <Route path="video/:id" element={<VideoDetail />} />
          <Route path="history" element={<History />} />
          <Route path="view_later" element={<WatchLater />} />
          <Route path="liked_video" element={<LikedVideos />} />
          <Route path="post" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

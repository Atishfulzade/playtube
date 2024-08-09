import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveUserData, getUserData } from "../utils/firebaseStore";
import { Videos } from "../components";
import { getAuth } from "firebase/auth";

const LikedVideos = ({ setLeftSideBarOpen }) => {
  // State to store the liked videos
  const [data, setData] = useState([]);

  // Get liked videos from Redux store
  const list = useSelector((state) => state.viewLater.playList);

  // Fetch user's liked videos from Firebase on component mount
  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData) {
            setData(userData.likedVideos || []);
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.error("No user is signed in");
      }
    };

    fetchData();
    setLeftSideBarOpen(true);
  }, [setLeftSideBarOpen]);

  // Save updated liked videos to Firebase when the list changes
  useEffect(() => {
    const saveData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          await saveUserData(user.uid, { likedVideos: list });
          setData(list);
        } catch (error) {
          console.error("Error saving user data:", error.message);
        }
      } else {
        console.error("No user is signed in");
      }
    };

    saveData();
  }, [list]);

  return (
    <div className="flex pb-10 p-5 flex-col h-full w-full">
      <h3 className="mb-3 md:text-xl">Liked videos</h3>
      {data.length < 1 ? (
        "No liked video available"
      ) : (
        <Videos
          videoData={data}
          add={false}
          flex={"items-start justify-start"}
        />
      )}
    </div>
  );
};

export default LikedVideos;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveUserData, getUserData } from "../utils/firebaseStore";
import { Videos } from "../components";
import { getAuth } from "firebase/auth";

const WatchLater = ({ setLeftSideBarOpen }) => {
  const [data, setData] = useState([]);
  const list = useSelector((state) => state.viewLater.playList);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData) {
            setData(userData.watchLater || []);
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

  useEffect(() => {
    const saveData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          await saveUserData(user.uid, { watchLater: list });
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
      <h3 className="mb-3 md:text-xl">Your Watch Later Videos</h3>
      {data.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <Videos videoData={data} add={false} flex="items-start justify-start" />
      )}
    </div>
  );
};

export default WatchLater;

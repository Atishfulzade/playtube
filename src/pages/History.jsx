import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveUserData, getUserData } from "../utils/firebaseStore";
import { Videos } from "../components";
import { getAuth } from "firebase/auth";

const History = ({ setLeftSideBarOpen }) => {
  const [data, setData] = useState([]);
  const history = useSelector((state) => state.historyVideo.history);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userData = await getUserData(user.uid);
        if (userData) {
          setData(userData.history || []);
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
        await saveUserData(user.uid, { history });
        setData(history);
      } else {
        console.error("No user is signed in");
      }
    };

    saveData();
  }, [data]);

  return (
    <div className="flex pb-10 p-5 flex-col h-full w-full">
      <h3 className="mb-3 md:text-xl">Your Watched Videos</h3>
      {data.length < 1 ? (
        "History unavailable"
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

export default History;

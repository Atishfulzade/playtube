import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveUserData, getUserData } from "../utils/firebaseStore";
import { Videos } from "../components";
import { getAuth } from "firebase/auth";

const LikedVideos = ({ setLeftSideBarOpen }) => {
  const [data, setData] = useState([]);
  const list = useSelector((state) => state.viewLater.playList);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {import React, { useEffect, useState } from "react";
      import { useSelector } from "react-redux";
      import { saveUserData, getUserData } from "../utils/firebaseStore";
      import { Videos } from "../components";
      import { getAuth } from "firebase/auth";
      
      const History = ({ setLeftSideBarOpen }) => {
        // State to store user's video history
        const [data, setData] = useState([]);
        
        // Get video history from Redux store
        const history = useSelector((state) => state.historyVideo.history);
      
        // Fetch user's history from Firebase on component mount
        useEffect(() => {
          const fetchData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
      
            if (user) {
              try {
                const userData = await getUserData(user.uid);
                if (userData) {
                  setData(userData.history || []);
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
      
        // Save updated history to Firebase when it changes
        useEffect(() => {
          const saveData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
      
            if (user) {
              try {
                await saveUserData(user.uid, { history });
                setData(history);
              } catch (error) {
                console.error("Error saving user data:", error.message);
              }
            } else {
              console.error("No user is signed in");
            }
          };
      
          saveData();
        }, [history]); // Only trigger saveData when history changes
      
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
      
        const userData = await getUserData(user.uid);
        if (userData) {
          setData(userData.likedVideos || []);
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
        await saveUserData(user.uid, { likedVideos: list });
        setData(list);
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

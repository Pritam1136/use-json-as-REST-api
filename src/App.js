/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Popup from "./components/Popup";
import WriteIcon from "./components/WriteIcon";

const App = () => {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  let [filteredThreads, setFilteredThreads] = useState(null);
  const [popup, setOpenPopup] = useState(false);
  const [interactingThread, setInteractingThread] = useState(null);
  const [popupFeedThreads, setPopupFeedThreads] = useState(null);
  const [text, setText] = useState("");

  const userId = "c484a199-4e51-473e-9c28-d70783bb95";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getThread = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?thread_from=${userId}`
      );
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getThreadsFeed = async () => {
    try {
      if (viewThreadsFeed) {
        const standAlone = threads?.filter(
          (thread) => thread.reply_to === null
        );
        setFilteredThreads(standAlone);
      }
      if (!viewThreadsFeed) {
        const replyThread = threads?.filter(
          (thread) => thread.reply_to !== null
        );
        setFilteredThreads(replyThread);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRepies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${interactingThread?.id}`
      );
      const data = await response.json();
      setPopupFeedThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postThread = async () => {
    const thread = {
      timestamp: new Date(),
      thread_from: user.user_uuid,
      thread_to: user.user_uuid || null,
      reply_to: interactingThread?.id || null,
      text: text,
      likes: [],
    };

    try {
      const response = await fetch(`http://localhost:3000/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thread),
      });
      const result = await response.json();
      console.log(result);
      getThread();
      getRepies();
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getThread();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  useEffect(() => {
    getRepies();
  }, [interactingThread]);

  const handleClick = () => {
    setPopupFeedThreads(null);
    setInteractingThread(null);
    setOpenPopup(true);
  };

  console.log(popupFeedThreads);

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed
            user={user}
            filteredThreads={filteredThreads}
            setOpenPopup={setOpenPopup}
            getThread={getThread}
            setInteractingThread={setInteractingThread}
          />
          {popup && (
            <Popup
              user={user}
              setOpenPopup={setOpenPopup}
              popupFeedThreads={popupFeedThreads}
              text={text}
              setText={setText}
              postThread={postThread}
            />
          )}
          <div onClick={handleClick}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default App;

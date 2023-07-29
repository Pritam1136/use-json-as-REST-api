/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getTimePassed } from "../utils/TimePassed";

const PopupThreads = ({ popupFeedThread }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${popupFeedThread.thread_from}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user?.img} alt="profile avatar" />
          </div>
          <div>
            <p>
              <strong>{user?.handle}</strong>
            </p>
            <p>{popupFeedThread.text}</p>
          </div>
        </div>
        <p className="sub-text">
          {getTimePassed(new Date(popupFeedThread.timestamp))}
        </p>
      </div>
    </article>
  );
};

export default PopupThreads;

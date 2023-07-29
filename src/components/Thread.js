/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Thread = ({
  user,
  filteredThread,
  setOpenPopup,
  getThread,
  setInteractingThread,
}) => {
  const [replyLength, setReplyLength] = useState(null);

  const getTimePassed = (targetDate) => {
    const now = new Date();
    const timeDifference = now - targetDate;
    const totalHourPassed = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysPassed = Math.floor(totalHourPassed / 24);
    const remainingHours = totalHourPassed % 24;

    const dayText =
      daysPassed > 0
        ? `${daysPassed} day${daysPassed === 1 ? "" : "s"} and`
        : "";
    const hoursText = `${remainingHours} hour${
      remainingHours === 1 ? "" : "s"
    }`;

    return dayText + " " + hoursText + " ago";
  };

  // console.log(filteredThread);

  const postLike = async () => {
    const hasedBeenLikedByUser = filteredThread.likes.some(
      (like) => like.user_uuid === user.user_uuid
    );

    if (!hasedBeenLikedByUser) {
      filteredThread.likes.push({
        user_uuid: user.user_uuid,
      });
      try {
        const response = await fetch(
          `http://localhost:3000/threads/${filteredThread.id}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filteredThread),
          }
        );
        const result = await response.json();
        console.log("success");
        getThread();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getRepiesLength = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${filteredThread.id}`
      );
      const data = await response.json();
      setReplyLength(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRepiesLength();
  }, [filteredThread]);

  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user.img} alt="profile avatar" />
          </div>
          <div>
            <p>
              <strong>{user.handle}</strong>
            </p>
            <p>{filteredThread.text}</p>
          </div>
        </div>
        <p className="sub-text">
          {getTimePassed(new Date(filteredThread.timestamp))}
        </p>
      </div>
      <div className="icons">
        <svg
          onClick={postLike}
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
            fillRule="nonzero"
          />
        </svg>
        <svg
          onClick={() => {
            setOpenPopup(true);
            setInteractingThread(filteredThread);
          }}
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M20 15c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m-3 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1m5.415 4.946c-1 .256-1.989.482-3.324.482-3.465 0-7.091-2.065-7.091-5.423 0-3.128 3.14-5.672 7-5.672 3.844 0 7 2.542 7 5.672 0 1.591-.646 2.527-1.481 3.527l.839 2.686-2.943-1.272zm-13.373-3.375l-4.389 1.896 1.256-4.012c-1.121-1.341-1.909-2.665-1.909-4.699 0-4.277 4.262-7.756 9.5-7.756 5.018 0 9.128 3.194 9.467 7.222-1.19-.566-2.551-.889-3.967-.889-4.199 0-8 2.797-8 6.672 0 .712.147 1.4.411 2.049-.953-.126-1.546-.272-2.369-.483m17.958-1.566c0-2.172-1.199-4.015-3.002-5.21l.002-.039c0-5.086-4.988-8.756-10.5-8.756-5.546 0-10.5 3.698-10.5 8.756 0 1.794.646 3.556 1.791 4.922l-1.744 5.572 6.078-2.625c.982.253 1.932.407 2.85.489 1.317 1.953 3.876 3.314 7.116 3.314 1.019 0 2.105-.135 3.242-.428l4.631 2-1.328-4.245c.871-1.042 1.364-2.384 1.364-3.75" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z" />
        </svg>
      </div>
      <p className="sub-text">
        <span
          onClick={() => {
            setOpenPopup(true);
            setInteractingThread(filteredThread);
          }}
        >
          {replyLength} replies
        </span>{" "}
        ● <span>{filteredThread.likes.length} likes</span>
      </p>
    </article>
  );
};

export default Thread;

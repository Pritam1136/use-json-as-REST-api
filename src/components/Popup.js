/* eslint-disable array-callback-return */
import React from "react";
import ThreadInput from "./ThreadInput";
import PopupThreads from "./PopupThreads";

const Popup = ({
  user,
  setOpenPopup,
  popupFeedThreads,
  text,
  setText,
  postThread,
}) => {
  return (
    <div className="popup">
      <p onClick={() => setOpenPopup(false)} style={{ cursor: "pointer" }}>
        X
      </p>
      {popupFeedThreads?.map((popupFeedThread) => (
        <PopupThreads
          key={popupFeedThread.id}
          popupFeedThread={popupFeedThread}
        />
      ))}

      <ThreadInput
        user={user}
        text={text}
        setText={setText}
        postThread={postThread}
      />
    </div>
  );
};

export default Popup;

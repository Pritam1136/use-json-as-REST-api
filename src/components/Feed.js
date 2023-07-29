import React from "react";
import Thread from "./Thread";

const Feed = ({
  user,
  setOpenPopup,
  filteredThreads,
  getThread,
  setInteractingThread,
}) => {
  return (
    <div className="feed">
      {filteredThreads?.map((filteredThread) => (
        <Thread
          key={filteredThread.id}
          setOpenPopup={setOpenPopup}
          user={user}
          filteredThread={filteredThread}
          getThread={getThread}
          setInteractingThread={setInteractingThread}
        />
      ))}
    </div>
  );
};

export default Feed;

import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Comment } from "../util/commonTypes";

type PreviousCommentsProps = {
  commentList: Comment[];
};

const PreviousComments: React.FC<PreviousCommentsProps> = ({ commentList }) => {
  const [numCommentsShown, setNumCommentsShown] = useState(0);

  // If user adds a comment, the number of comments shown should increase by 1
  useEffect(() => {
    setNumCommentsShown((prevNumCommentsShown) => prevNumCommentsShown + 1);
  }, [commentList]);

  const onSeeMoreComments = () => {
    setNumCommentsShown((prevNumCommentsShown) => prevNumCommentsShown + 3);
  };

  return (
    <div className="previous-comments-container">
      {numCommentsShown < commentList.length && (
        <Button onClick={onSeeMoreComments}>See More Comments</Button>
      )}
      {commentList.slice(numCommentsShown * -1).map((comment) => (
        <div key={comment._id}>{comment.comment}</div>
      ))}
    </div>
  );
};

export default PreviousComments;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Comment.module.scss";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  isCommentLiked,
  likeComment,
  unlikeComment,
} from "../../../../../Util/CommentAPI";

export type CommentType = {
  _id: string;
  userId: string;
  username: string;
  text: string;
  likeCount: number;
  postId: string;
};

type CommentProps = {
  comment: CommentType;
  postId: String;
};

export const Comment = ({ comment, postId }: CommentProps) => {
  const [commentContent, setCommentContent] = useState(comment);
  const [isLiked, setIsLiked] = useState(false);
  const userId = "1";

  const handleClick = async () => {
    setIsLiked(!isLiked);
    setCommentContent((prevState) => ({
      ...prevState,
      likeCount: prevState.likeCount + (isLiked ? -1 : 1),
    }));
    isLiked
      ? unlikeComment(commentContent._id, userId)
      : likeComment(commentContent._id, userId);
  };

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const isLiked = await isCommentLiked(commentContent._id, userId);
        setIsLiked(isLiked);
      } catch (err) {
        console.log(err);
      }
    };
    checkLiked();
  }, [commentContent._id]);

  return (
    <div className={styles.comment}>
      <div>
        <h4 className={styles.commentUser}>@{commentContent.username}</h4>
        <p className={styles.commentTxt}>{commentContent.text}</p>
      </div>
      <div
        className={`${styles.likeWrapper} ${isLiked ? styles.isLiked : ""}`}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          className={`${styles.postOptionIcon} ${styles.postLikeIcon}`}
          icon={faHeart}
        />
        <p>{commentContent.likeCount}</p>
      </div>
    </div>
  );
};

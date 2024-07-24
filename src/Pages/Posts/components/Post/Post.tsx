import { useEffect, useRef, useState } from "react";
import styles from "./Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  formatDate,
  hasLikedPost,
  likePost,
  unlikePost,
} from "../../../../Util/PostsAPI";
import { Comments } from "../Comments/Comments";

export type PostType = {
  _id: string;
  username: string;
  userId: string;
  title: string;
  text: string;
  likeCount: number;
  createdAt: Date;
  numComments: number;
};

export type NewPostType = Omit<PostType, "_id" | "createdAt">;

type PostProps = {
  post: PostType;
};

export const Post = ({ post }: PostProps) => {
  const [postContent, setPostContent] = useState<PostType>(post);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [lastSeenId, setLastSeenId] = useState("");
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const likeBtnRef = useRef<HTMLDivElement>(null);
  const userId = "1";

  useEffect(() => {
    const checkPostLiked = async () => {
      const isPostLiked = await hasLikedPost(post._id, userId);
      if (isPostLiked && likeBtnRef.current != null) {
        likeBtnRef.current.style.color = "red";
        setIsLiked(true);
      }
    };

    checkPostLiked();
  }, []);

  const handleLikeClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isLiked) {
      e.currentTarget.style.color = "black";
      unlikePost(post._id, userId);
      setPostContent((prevState) => ({
        ...prevState,
        likeCount: prevState.likeCount - 1,
      }));
    } else {
      e.currentTarget.style.color = "red";
      likePost(post._id, userId);
      setPostContent((prevState) => ({
        ...prevState,
        likeCount: prevState.likeCount + 1,
      }));
    }
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postContent}>
        <h2 className={styles.postTitle}>{postContent.title}</h2>
        <h4 className={styles.postUser}>@{postContent.username}</h4>
        <p className={styles.postTxt}>{postContent.text}</p>
        <p className={styles.postDate}>
          {formatDate(new Date(postContent.createdAt))}
        </p>
      </div>
      <div className={styles.postOptions}>
        <div className={styles.postOption} onClick={handleCommentClick}>
          <FontAwesomeIcon className={styles.postOptionIcon} icon={faComment} />
          <p>{postContent.numComments}</p>
        </div>
        <div
          className={styles.postOption}
          onClick={handleLikeClick}
          ref={likeBtnRef}
        >
          <FontAwesomeIcon
            className={`${styles.postOptionIcon} ${styles.postLikeIcon}`}
            icon={faHeart}
          />
          <p>{postContent.likeCount}</p>
        </div>
      </div>
      <Comments
        isCommentsOpen={isCommentsOpen}
        commentSectionRef={commentSectionRef}
        postId={postContent._id}
        setPostContent={setPostContent}
      />
    </div>
  );
};

import React from "react";
import styles from "../../../Posts/components/Post/Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

type PostPreviewProps = {
  title: string;
  text: string;
};

export const PostPreview: React.FC<PostPreviewProps> = ({ title, text }) => {
  const defaultUsername = "YourUsername"; // Replace this with the actual username if available
  const currentDate = new Date();

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postContent}>
        <h2 className={styles.postTitle}>{title || "Your Post Title"}</h2>
        <h4 className={styles.postUser}>@{defaultUsername}</h4>
        <p className={styles.postTxt}>
          {text || "Your post text goes here..."}
        </p>
        <p className={styles.postDate}>
          {currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}
        </p>
      </div>
      <div className={styles.postOptions}>
        <div className={styles.postOption}>
          <p>0</p>
          <FontAwesomeIcon className={styles.postOptionIcon} icon={faComment} />
        </div>
        <div className={styles.postOption}>
          <p>0</p>
          <FontAwesomeIcon
            className={`${styles.postOptionIcon} ${styles.postLikeIcon}`}
            icon={faHeart}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import { Comment, CommentType } from "./Comment/Comment";
import { PostType } from "../Post/Post";
import { Spinner } from "../../../../components/Spinner/Spinner";
import { useComments } from "../../../../hooks/useComments";

type CommentsProps = {
  isCommentsOpen: boolean;
  commentSectionRef: React.RefObject<HTMLDivElement>;
  postId: string;
  setPostContent: React.Dispatch<React.SetStateAction<PostType>>;
};

export type NewCommentType = Omit<CommentType, "_id">;

export const Comments = ({
  isCommentsOpen,
  commentSectionRef,
  postId,
  setPostContent,
}: CommentsProps) => {
  const [isPadded, setIsPadded] = useState(false);
  const maxCharCount = 250;
  const {
    handleChange,
    handleSubmit,
    postComments,
    charCount,
    isLoadingComments,
    maxCommentsLoaded,
    ref,
  } = useComments({
    isCommentsOpen,
    postId,
    setPostContent,
  });

  // Add or Remove padding when comments are open smoothly
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isCommentsOpen) {
      setIsPadded(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsPadded(false);
      }, 190);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCommentsOpen]);

  return (
    <div
      className={`${styles.commentsSectionWrapper} ${
        isCommentsOpen ? styles.active : ""
      } ${isPadded ? styles.padded : ""}`}
      ref={commentSectionRef}
    >
      <form className={styles.createCommentForm} onSubmit={handleSubmit}>
        <textarea
          maxLength={maxCharCount}
          placeholder="What would you like to comment?"
          className={styles.createCommentInput}
          onChange={handleChange}
        />
        <div className={styles.createCommentBtnWrapper}>
          <p className={maxCharCount === charCount ? styles.maxCharCount : ""}>
            {charCount}/{maxCharCount}
          </p>
          <button className={styles.createCommentBtn}>Comment</button>
        </div>
      </form>
      <div className={styles.commentsWrapper}>
        {postComments.length > 0 || isLoadingComments ? (
          postComments.map((c, i) => (
            <Comment postId={postId} comment={c} key={c._id}></Comment>
          ))
        ) : (
          <h2 className={styles.noCommentTxt}>
            No Comments To Show Yet! Be The First To Comment
          </h2>
        )}
      </div>
      {!isLoadingComments ? (
        postComments.length !== 0 &&
        (maxCommentsLoaded ? (
          <div className={styles.moreComments} ref={ref}>
            That's All The Comments!
          </div>
        ) : (
          <div className={styles.moreComments} ref={ref}>
            Load More Comments
          </div>
        ))
      ) : (
        <div className={`${styles.spinnerSection}`}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

import styles from "./Comments.module.scss";
import { Comment } from "./Comment/Comment";

type CommentsProps = {
  isCommentsOpen: boolean;
  commentSectionRef: React.RefObject<HTMLDivElement>;
};

export const Comments = ({
  isCommentsOpen,
  commentSectionRef,
}: CommentsProps) => {
  return (
    <div
      className={`${styles.commentsWrapper} ${
        isCommentsOpen ? styles.active : ""
      }`}
      ref={commentSectionRef}
    >
      <form className={styles.createCommentForm}>
        <textarea
          placeholder="What would you like to comment?"
          className={styles.createCommentInput}
        />
        <button className={styles.createCommentBtn}>Comment</button>
      </form>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

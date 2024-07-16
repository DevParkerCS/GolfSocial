import styles from "./Comment.module.scss";

export const Comment = () => {
  return (
    <div className={styles.comment}>
      <h4 className={styles.commentUser}>@Th3RedMan</h4>
      <p className={styles.commentTxt}>I'm doing so great! Happy to be here!</p>
    </div>
  );
};

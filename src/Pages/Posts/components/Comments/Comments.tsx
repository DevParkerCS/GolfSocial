import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import { Comment, CommentType } from "./Comment/Comment";
import { PostType } from "../Post/Post";
import { getComments, postComment } from "../../../../Util/CommentAPI";
import _ from "lodash";
import { Spinner } from "../../../../components/Spinner/Spinner";

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
  const [charCount, setCharCount] = useState(0);
  const [postComments, setPostComments] = useState<CommentType[]>([]);
  const [hasLoadedComments, setHasLoadedComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const maxCharCount = 250;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Upload new comment on post
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const text = form.elements[0] as HTMLInputElement;
      const newComment: NewCommentType = {
        username: "Th3RedMan",
        userId: "1",
        likeCount: 0,
        text: text.value,
        postId: postId,
      };
      try {
        const comment = await postComment(newComment, postId);
        setPostContent((prevState) => ({
          ...prevState,
          numComments: (prevState.numComments += 1),
        }));
        setPostComments((prevState) => [_.cloneDeep(comment), ...prevState]);
        setCharCount(0);
        text.value = "";
      } catch (err) {
        console.log("Error Creating Post");
      }
    },
    [postId, setPostContent]
  );

  // Add/Remove padding when comments are open smoothly
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

  useEffect(() => {
    if (!hasLoadedComments && isCommentsOpen) {
      const fetchComments = async () => {
        console.log("Fetching");
        setIsLoadingComments(true);
        const loadedComments = await getComments(postId);
        setIsLoadingComments(false);
        setPostComments(loadedComments);
      };

      fetchComments();
      setHasLoadedComments(true);
    }
  }, [hasLoadedComments, isCommentsOpen, postId]);

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
        {isLoadingComments ? (
          <Spinner />
        ) : postComments.length > 0 ? (
          postComments.map((c, i) => (
            <Comment postId={postId} comment={c} key={c._id}></Comment>
          ))
        ) : (
          <h2 className={styles.noCommentTxt}>
            No Comments To Show Yet! Be The First To Comment
          </h2>
        )}
      </div>
    </div>
  );
};

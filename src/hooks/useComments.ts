import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CommentType } from "../Pages/Posts/components/Comments/Comment/Comment";
import { getComments, postComment } from "../Util/CommentAPI";
import { NewCommentType } from "../Pages/Posts/components/Comments/Comments";
import { PostType } from "../Pages/Posts/components/Post/Post";
import _ from "lodash";

type LastCommentInfo = {
  nextPage: number;
  timeStamp: string;
};

type UseCommentsParams = {
  isCommentsOpen: boolean;
  postId: string;
  setPostContent: React.Dispatch<React.SetStateAction<PostType>>;
};

export const useComments = ({
  isCommentsOpen,
  postId,
  setPostContent,
}: UseCommentsParams) => {
  const [lastcommentInfo, setLastCommentInfo] =
    useState<LastCommentInfo | null>(null);
  const hasLoadedPosts = useRef(false);

  // Returned Values
  const [charCount, setCharCount] = useState(0);
  const [postComments, setPostComments] = useState<CommentType[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [maxCommentsLoaded, setMaxCommentsLoaded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !maxCommentsLoaded) {
      fetchComments();
      console.log("CHECKING");
    }
  }, [inView]);

  useEffect(() => {
    if (!hasLoadedPosts.current && isCommentsOpen) {
      fetchComments();
      console.log("FETCHING");
      hasLoadedPosts.current = true;
    }
  }, [isCommentsOpen]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const fetchComments = async () => {
    setIsLoadingComments(true);
    const loadedComments = await getComments(
      postId,
      lastcommentInfo?.nextPage,
      lastcommentInfo?.timeStamp
    );
    setIsLoadingComments(false);
    setPostComments((prevState) => [...prevState, ...loadedComments.comments]);
    setMaxCommentsLoaded(lastcommentInfo?.nextPage === loadedComments.nextPage);
    setLastCommentInfo({
      nextPage: loadedComments.nextPage,
      timeStamp: loadedComments.date,
    });
    loadedComments.comments.length === 0 && setMaxCommentsLoaded(true);
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
        setPostComments((prevState) => {
          console.log(prevState);
          return [_.cloneDeep(comment), ...prevState];
        });
        setCharCount(0);
        text.value = "";
      } catch (err) {
        console.log("Error Creating Post");
      }
    },
    [postId, setPostContent]
  );

  return {
    handleChange,
    handleSubmit,
    postComments,
    charCount,
    isLoadingComments,
    maxCommentsLoaded,
    ref,
  };
};

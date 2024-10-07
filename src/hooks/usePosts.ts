import { useState, useEffect } from "react";
import { loadRecentPosts, createNewPost } from "../Util/PostsAPI";
import { PostType, NewPostType } from "../Pages/Posts/components/Post/Post";
import { badWords } from "../BadWords";
import { useUser } from "./useUser";

type LastPostInfoType = {
  nextPage: number;
  date: string;
};

type UsePostsProps = {
  inProfile: boolean;
};

export const usePosts = ({ inProfile }: UsePostsProps) => {
  const { user } = useUser();
  const [loadedPosts, setLoadedPosts] = useState<PostType[]>([]);
  const [lastPostInfo, setLastPostInfo] = useState<LastPostInfoType | null>(
    null
  );
  const [maxPostsLoaded, setMaxPostsLoaded] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  const maxTitle = 50;

  const fetchPosts = async () => {
    if (!maxPostsLoaded) {
      try {
        setIsLoadingPosts(true);
        const recentPosts = await (lastPostInfo
          ? loadRecentPosts(
              inProfile ? user?._id : undefined,
              lastPostInfo.nextPage,
              lastPostInfo.date
            )
          : loadRecentPosts(inProfile ? user?._id : undefined));

        const nextPage = recentPosts.nextPage;
        const date = recentPosts.date;
        setMaxPostsLoaded(
          nextPage === lastPostInfo?.nextPage || nextPage === 1
        );
        setLastPostInfo({ nextPage, date });
        setLoadedPosts((prevState) => [...prevState, ...recentPosts.posts]);
        setIsLoadingPosts(false);
      } catch (err) {
        console.log(err);
        setIsLoadingPosts(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const form = e.target as HTMLFormElement;
      const title = form.elements[0] as HTMLInputElement;
      const text = form.elements[1] as HTMLTextAreaElement;
      const words = [...title.value.split(" "), ...text.value.split(" ")];
      const hasBadWords = words.some((word) => badWords.has(word));

      if (hasBadWords) {
        console.log("Bad Word Found!");
        return;
      }

      const newPost: NewPostType = {
        username: user?.username,
        userId: user?._id,
        likeCount: 0,
        numComments: 0,
        title: title.value,
        text: text.value,
      };
      try {
        const post = await createNewPost(newPost);
        setLoadedPosts((prevState) => [post, ...prevState]);
        setCharCount(0);
        title.value = "";
        text.value = "";
      } catch (err) {
        console.log("Error Creating Post");
      }
    } else {
      console.log("User not logged in");
    }
  };

  return {
    loadedPosts,
    maxPostsLoaded,
    isLoadingPosts,
    fetchPosts,
    handleChange,
    handleSubmit,
    charCount,
    maxChars,
    maxTitle,
  };
};

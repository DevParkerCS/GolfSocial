import Nav from "../../components/Nav/Nav";
import styles from "./Posts.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { NewPostType, Post } from "./components/Post/Post";
import { PostType } from "./components/Post/Post";
import { createNewPost, loadRecentPosts } from "../../Util/PostsAPI";
import { Spinner } from "../../components/Spinner/Spinner";

export const Posts = () => {
  const [charCount, setCharCount] = useState(0);
  const [loadedPosts, setLoadedPosts] = useState<PostType[]>([]);
  const maxChars = 500;
  const maxTitle = 50;
  const userId = 123456;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = form.elements[0] as HTMLInputElement;
    const text = form.elements[1] as HTMLTextAreaElement;
    const newPost: NewPostType = {
      username: "Th3RedMan",
      userId: "1",
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
  };

  const fetchPosts = async () => {
    try {
      const recentPosts = await loadRecentPosts();
      setLoadedPosts(recentPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Nav />
      <div className={styles.contentWrapper}>
        <div className={styles.centerWrapper}>
          <section className={styles.makePostSection}>
            <form onSubmit={handleSubmit} className={styles.createPostForm}>
              <div className={styles.createPostInputWrapper}>
                <input
                  className={`${styles.createPostInput} ${styles.createPostTitle}`}
                  maxLength={maxTitle}
                  placeholder="Title"
                  required
                ></input>
                <textarea
                  className={styles.createPostInput}
                  placeholder="What golf thoughts are on your mind?"
                  onChange={handleChange}
                  maxLength={maxChars}
                  required
                />
              </div>
              <div className={styles.createPostInfoWrapper}>
                <p
                  className={`${styles.createPostChars} ${
                    charCount === maxChars ? styles.maxCount : ""
                  }`}
                >
                  {charCount}/{maxChars}
                </p>
                <button className={styles.createPostSubmit} type="submit">
                  Post
                </button>
              </div>
            </form>
          </section>
          <section className={styles.postsSection}>
            {loadedPosts.length != 0 ? (
              loadedPosts.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <Spinner />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

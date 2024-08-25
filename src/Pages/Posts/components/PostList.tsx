import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePosts } from "../../../hooks/usePosts";
import { Spinner } from "../../../components/Spinner/Spinner";
import { Post } from "./Post/Post";
import styles from "./PostList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type PostListProps = {
  userId?: string;
  inProfile?: boolean;
};

export const PostList = ({ userId, inProfile = false }: PostListProps) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const {
    loadedPosts,
    maxPostsLoaded,
    isLoadingPosts,
    fetchPosts,
    handleChange,
    handleSubmit,
    charCount,
    maxChars,
    maxTitle,
  } = usePosts({ userId });

  useEffect(() => {
    if (inView) {
      fetchPosts();
    }
  }, [inView]);

  //Basic check for bad words

  return (
    <div
      className={`${styles.contentWrapper} ${
        inProfile ? styles.profileStyle : ""
      }`}
    >
      <div
        className={`${styles.centerWrapper} ${
          inProfile ? styles.profileStyle : ""
        }`}
      >
        {!inProfile ? (
          <section className={styles.makePostSection}>
            <form onSubmit={handleSubmit} className={styles.createPostForm}>
              <div className={styles.createPostInputWrapper}>
                <input
                  className={`${styles.createPostInput} ${styles.createPostTitle}`}
                  maxLength={maxTitle}
                  placeholder="Title"
                  required
                />
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
        ) : (
          ""
        )}

        <section className={styles.postsSection}>
          {loadedPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </section>
        <div
          className={`${styles.spinnerWrapper} ${
            isLoadingPosts ? styles.active : ""
          }`}
        >
          {isLoadingPosts ? <Spinner /> : ""}
        </div>
        {maxPostsLoaded ? (
          <div className={styles.maxPostsLoaded}>
            <h2 className={styles.maxTitle}>That's all the posts for now</h2>
            <h3 className={styles.maxSubtitle}>
              Try refreshing your page for the newest posts!
            </h3>
          </div>
        ) : (
          <div className={styles.loadMorePosts} ref={ref}>
            <h2 className={styles.loadTitle}>Load More Posts</h2>
            <FontAwesomeIcon className={styles.loadIcon} icon={faChevronDown} />
          </div>
        )}
      </div>
    </div>
  );
};

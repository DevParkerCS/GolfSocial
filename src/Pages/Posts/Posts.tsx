import React from "react";
import Nav from "../../components/Nav/Nav";
import { PostList } from "./components/PostList";
import styles from "./Posts.module.scss";

export const Posts = () => {
  return (
    <div>
      <Nav />
      <PostList />
    </div>
  );
};

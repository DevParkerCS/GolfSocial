import Nav from "../../components/Nav/Nav";
import { PostList } from "./components/PostList";

export const Posts = () => {
  return (
    <div>
      <Nav />
      <PostList inProfile={false} />
    </div>
  );
};

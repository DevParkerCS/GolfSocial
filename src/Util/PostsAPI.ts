import axios from "axios";
import { NewPostType, PostType } from "../Pages/Posts/components/Post/Post";

const API_BASE_URL = "http://localhost:3000/api";

export type LoadedPostsType = {
  nextPage: number;
  date: string;
  posts: PostType[];
};

export const loadRecentPosts = async (
  userId?: string,
  page = 1,
  date = new Date().toISOString()
): Promise<LoadedPostsType> => {
  try {
    const response = await axios.get<LoadedPostsType>(`${API_BASE_URL}/posts`, {
      params: { page, date, userId },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createNewPost = async (post: NewPostType): Promise<PostType> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const hasLikedPost = async (
  postId: String,
  userId: String
): Promise<Boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/isPostLiked`, {
      params: {
        userId,
        postId,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const likePost = async (postId: String, userId: String) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/likePost`, {
      userId,
      postId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = async (postId: String, userId: String) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/unlikePost`, {
      userId,
      postId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

import axios from "axios";
import { NewPostType, PostType } from "../Pages/Posts/components/Post/Post";

const API_BASE_URL = "http://localhost:3000";

export const loadRecentPosts = async (): Promise<PostType[]> => {
  try {
    const response = await axios.get<PostType[]>(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createNewPost = async (
  post: NewPostType
): Promise<NewPostType> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const hasLiked = async (
  postId: String,
  userId: String
): Promise<Boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/isLiked`, {
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
    const response = await axios.post(`${API_BASE_URL}/like`, {
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
    const response = await axios.post(`${API_BASE_URL}/unlike`, {
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

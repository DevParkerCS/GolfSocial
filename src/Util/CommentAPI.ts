import axios from "axios";
import { NewCommentType } from "../Pages/Posts/components/Comments/Comments";
import { CommentType } from "../Pages/Posts/components/Comments/Comment/Comment";

const API_BASE_URL = "http://localhost:3000";

export const getComments: (postId: String) => Promise<CommentType[]> = async (
  postId: String
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments`, {
      params: {
        postId,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postComment = async (
  comment: NewCommentType,
  postId: String
): Promise<CommentType> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments`, {
      comment,
      postId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const likeComment = async (commentId: String, userId: String) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/likeComment`, {
      userId,
      commentId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const unlikeComment = async (commentId: String, userId: String) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/unlikeComment`, {
      userId,
      commentId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const isCommentLiked = async (
  commentId: String,
  userId: String
): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/isCommentLiked`, {
      params: {
        userId,
        commentId,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

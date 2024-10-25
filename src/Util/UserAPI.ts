import axios from "axios";
import { PublicUserType } from "../types/UserTypes";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchPublicProfile = async (
  userID: string
): Promise<PublicUserType | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/publicUser`, {
      params: {
        userID,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error fetching user");
    return null;
  }
};

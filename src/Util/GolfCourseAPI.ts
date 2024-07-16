import axios from "axios";

// Define the base URL for your API
const API_BASE_URL = "http://localhost:3000";

// Define the GolfCourse type
export interface GolfCourse {
  name: string;
  location: {
    state: string;
    city: string;
    zipCode?: string;
  };
  slopeRating: number;
}

// Function to fetch all golf courses
export const fetchGolfCourses = async (): Promise<GolfCourse[]> => {
  const response = await axios.get(`${API_BASE_URL}/golfcourses`);
  return response.data;
};

// Function to create a new golf course
export const createGolfCourse = async (
  golfCourse: GolfCourse
): Promise<GolfCourse> => {
  const response = await axios.post(`${API_BASE_URL}/golfcourses`, golfCourse);
  return response.data;
};

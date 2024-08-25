import axios from "axios";
import { CourseType } from "../Pages/BrowseCourses/components/course/Course";

// Define the base URL for your API
const API_BASE_URL = "http://localhost:3000";

export const fetchTopCourses = async (): Promise<CourseType[]> => {
  try {
    const courses = await axios.get<CourseType[]>(`${API_BASE_URL}/topCourses`);
    return courses.data;
  } catch (err) {
    throw err;
  }
};

// Function to create a new golf course
export const createGolfCourse = async (
  golfCourse: CourseType
): Promise<CourseType> => {
  const response = await axios.post(`${API_BASE_URL}/golfcourses`, golfCourse);
  return response.data;
};

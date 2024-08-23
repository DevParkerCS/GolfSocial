import { useState, useEffect } from "react";
import axios from "axios";
import { CourseType } from "../Pages/BrowseCourses/components/course/Course";

export const useCourseSearch = (
  query: string,
  hasPlayed: boolean,
  userId: string
) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [playedCourses, setPlayedCourses] = useState<CourseType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    hasPlayed ? fetchPlayedCourses() : fetchCourses();
  }, [query, hasPlayed]);

  const fetchCourses = async () => {
    if (!query) {
      console.log("okay");
      setCourses([]);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      console.log("TRYING!");
      const response = await axios.get(`${API_BASE_URL}/searchCourses`, {
        params: {
          query,
        },
      });
      setCourses(response.data);
    } catch (err) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayedCourses = async () => {
    setLoading(true);
    setError(null);
    console.log("LOADING");
    await setTimeout(() => {
      setLoading(false);
    }, 2000);
    setError(null);

    return;

    // if (playedCourses !== null) {
    //   setCourses(playedCourses);
    // } else {
    // }
  };

  return { courses, loading, error, setCourses };
};

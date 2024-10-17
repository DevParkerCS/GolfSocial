import { useState, useEffect } from "react";
import axios from "axios";
import { CourseType } from "../Pages/BrowseCourses/components/course/Course";
import { fetchTopCourses } from "../Util/GolfCourseAPI";
import { useUser } from "./useUser";

export const useCourseSearch = (hasPlayed: boolean) => {
  const [courses, setCourses] = useState<CourseType[] | null>([]);
  const [topCourses, setTopCourses] = useState<CourseType[] | null>(null);
  const [playedCourses, setPlayedCourses] = useState<CourseType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useUser();
  const API_BASE_URL = "http://localhost:3000/api";

  // Determine if fetching every course, or only courses played by user
  const fetchCourses = (query: string) => {
    hasPlayed ? fetchPlayedCourses(query) : fetchAllCourses(query);
  };

  const fetchAllCourses = async (query: string) => {
    setLoading(true);
    setError(null);
    if (!query && topCourses) {
      setCourses(topCourses);
      return;
    } else if (!query && !topCourses) {
      try {
        const fetchedTopCourses = await fetchTopCourses();
        setTopCourses(fetchedTopCourses);
        setCourses(fetchedTopCourses);
        setLoading(false);
        return;
      } catch (err) {
        setError("Error loading courses");
      }
    }

    try {
      const response = await axios.get<CourseType[]>(
        `${API_BASE_URL}/searchCourses`,
        {
          params: {
            query,
          },
        }
      );
      setCourses(response.data);
    } catch (err) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  type FetchedPlayedResponse = {
    userId: string;
    playedCourses?: CourseType[];
  };

  const fetchPlayedCourses = async (query: string) => {
    setLoading(true);
    setError(null);

    if (!query && playedCourses) {
      setCourses(playedCourses);
      setLoading(false);
      return;
    }

    try {
      if (playedCourses) {
        const filteredCourses = playedCourses.filter((c) => {
          return c.courseName.toLowerCase().includes(query.toLowerCase());
        });
        setCourses(filteredCourses);
        setLoading(false);
        return;
      } else {
        const response = await axios.get<FetchedPlayedResponse>(
          `${API_BASE_URL}/playedCourses/${userId}`
        );
        setPlayedCourses(response.data?.playedCourses || null);
        setCourses(response.data?.playedCourses || null);
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to fetch played courses");
    }
  };

  return {
    courses,
    playedCourses,
    loading,
    error,
    setCourses,
    setPlayedCourses,
    fetchCourses,
  };
};

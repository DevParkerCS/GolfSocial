import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./BrowseCourses.module.scss";
import { Course, CourseType } from "./components/course/Course";
import { Spinner } from "../../components/Spinner/Spinner";
import { fetchTopCourses } from "../../Util/GolfCourseAPI";
import { SearchForm } from "./components/SearchForm/SearchForm";

export const BrowseCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("topCourses") || "[]");
    const savedTimestamp = parseInt(
      localStorage.getItem("topCoursesTimestamp") || "0",
      10
    );
    const fiveMin = 300000; // milliseconds in five min
    const currentTime = new Date().getTime();

    const callFetchAPI = async () => {
      try {
        setIsLoading(true);
        const topCourses = await fetchTopCourses();
        const currentTime = new Date().getTime();
        setLoadedCourses(topCourses);
        localStorage.setItem("topCourses", JSON.stringify(topCourses));
        localStorage.setItem("topCoursesTimestamp", currentTime.toString());
        setIsLoading(false);
      } catch (err) {
        setError("Error Loading top Courses");
      }
    };

    // Check if it has been greater than five minutes since last fetching data
    if (
      savedCourses &&
      savedTimestamp &&
      currentTime - savedTimestamp < fiveMin
    ) {
      // Use cached courses
      setLoadedCourses(savedCourses);
    } else {
      // Fetch new data
      callFetchAPI();
    }
  }, []);

  return (
    <div>
      <Nav />
      <div className={styles.contentWrapper}>
        <div className={styles.searchWrapper}>
          <h1 className={styles.searchTitle}>Search For Courses</h1>
          <SearchForm loadedCourses={loadedCourses} />
        </div>
        <section className={styles.coursesSection}>
          <h2 className={styles.coursesTitle}>Top 10 Played Courses</h2>
          <div className={styles.coursesWrapper}>
            {isLoading ? (
              <Spinner light={true} />
            ) : error ? (
              error
            ) : (
              loadedCourses.map((c) => (
                <Course key={c.courseId} courseInfo={c} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

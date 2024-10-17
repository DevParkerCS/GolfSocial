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

    callFetchAPI();
  }, []);

  return (
    <div>
      <Nav />
      <div className={styles.contentWrapper}>
        <div className={styles.searchWrapper}>
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

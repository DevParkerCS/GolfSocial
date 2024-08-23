import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import styles from "./BrowseCourses.module.scss";
import { Course, CourseType } from "./components/course/Course";
import axios from "axios";
import { Spinner } from "../../components/Spinner/Spinner";

export const BrowseCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await axios.get<CourseType[]>(
          `${API_BASE_URL}/topCourses`
        );
        setLoadedCourses(courses.data);
      } catch {
        setError(
          "There was an error loading courses, please refresh page to try again."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <Nav />
      <div className={styles.contentWrapper}>
        <div className={styles.searchWrapper}>
          <h1 className={styles.searchTitle}>Search For Courses</h1>
          <form className={styles.searchForm}>
            <input className={styles.searchInput} type="text"></input>
          </form>
        </div>
        <section className={styles.coursesSection}>
          <h2 className={styles.coursesTitle}>Top 10 Played Courses</h2>
          <div className={styles.coursesWrapper}>
            {isLoading ? (
              <Spinner light={true} />
            ) : error ? (
              error
            ) : (
              loadedCourses.map((c) => <Course key={c._id} courseInfo={c} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

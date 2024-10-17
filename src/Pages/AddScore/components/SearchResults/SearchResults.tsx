import { useEffect } from "react";
import { CourseType } from "../../../BrowseCourses/components/course/Course";
import styles from "./SearchResults.module.scss";

type Props = {
  active: boolean;
  courses: CourseType[] | null;
  courseCB: (course: CourseType) => void;
};

export const SearchResults = ({ active, courses, courseCB }: Props) => {
  // If no dropdown isn't active remove from dom.
  if (!active) {
    return <div className={styles.resultsWrapper}></div>;
  }
  return (
    <div className={`${styles.resultsWrapper} ${styles.active}`}>
      {courses && courses?.length > 0 ? (
        courses.map((c) => (
          <Result key={c.courseId} course={c} courseCB={courseCB} />
        ))
      ) : (
        <h2 className={styles.noCourses}>No courses found.</h2>
      )}
    </div>
  );
};

type ResultProps = {
  course: CourseType;
  courseCB: (course: CourseType) => void;
};

const Result = ({ course, courseCB }: ResultProps) => {
  return (
    <div className={styles.result} onClick={() => courseCB(course)}>
      <h3 className={styles.courseName}>{course.courseName}</h3>
      <p className={styles.courseLoc}>
        {course.courseCity}, {course.courseState}
      </p>
    </div>
  );
};

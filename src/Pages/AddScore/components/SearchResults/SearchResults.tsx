import { useEffect } from "react";
import { CourseType } from "../../../BrowseCourses/components/course/Course";
import styles from "./SearchResults.module.scss";

type Props = {
  active: boolean;
  courses: CourseType[];
  onCourseSelect?: (course: CourseType) => void;
};

export const SearchResults = ({ active, courses, onCourseSelect }: Props) => {
  // If no dropdown isn't active remove from dom.
  if (!active) {
    return <div className={styles.resultsWrapper}></div>;
  }
  return (
    <div className={`${styles.resultsWrapper} ${styles.active}`}>
      {courses.map((c) => (
        <Result key={c.courseId} course={c} onCourseSelect={onCourseSelect} />
      ))}
    </div>
  );
};

type ResultProps = {
  course: CourseType;
  onCourseSelect?: (course: CourseType) => void;
};

const Result = ({ course, onCourseSelect }: ResultProps) => {
  return (
    <div
      className={styles.result}
      onClick={
        onCourseSelect ? () => onCourseSelect(course) : () => console.log("IDK")
      }
    >
      <h3 className={styles.courseName}>{course.courseName}</h3>
      <p className={styles.courseLoc}>
        {course.courseCity}, {course.courseState}
      </p>
    </div>
  );
};

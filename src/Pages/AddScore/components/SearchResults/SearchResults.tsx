import { CourseType } from "../../../BrowseCourses/components/course/Course";
import styles from "./SearchResults.module.scss";

type Props = {
  active: boolean;
  courses: CourseType[];
  onCourseSelect: (course: CourseType) => void;
};

export const SearchResults = ({ active, courses, onCourseSelect }: Props) => {
  return (
    <div className={`${styles.resultsWrapper} ${active ? styles.active : ""}`}>
      {courses.map((c) => (
        <Result key={c._id} course={c} onCourseSelect={onCourseSelect} />
      ))}
    </div>
  );
};

type ResultProps = {
  course: CourseType;
  onCourseSelect: (course: CourseType) => void;
};

const Result = ({ course, onCourseSelect }: ResultProps) => {
  return (
    <div className={styles.result} onClick={() => onCourseSelect(course)}>
      <h3 className={styles.courseName}>{course.name}</h3>
      <p className={styles.courseLoc}>
        {course.city}, {course.state}
      </p>
    </div>
  );
};

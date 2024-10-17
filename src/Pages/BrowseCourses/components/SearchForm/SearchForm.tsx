import { useEffect, useState } from "react";
import { useCourseSearch } from "../../../../hooks/useCourseSearch";
import { useCourseSearchHandler } from "../../../../hooks/useCourseSearchHandler";
import { SearchResults } from "../../../AddScore/components/SearchResults/SearchResults";
import { CourseType } from "../course/Course";
import styles from "./SearchForm.module.scss";
import { CourseModal } from "../../../../components/CourseModal/CourseModal";
import { click } from "@testing-library/user-event/dist/click";

type SearchFormProps = {
  loadedCourses: CourseType[];
};

export const SearchForm = ({ loadedCourses }: SearchFormProps) => {
  const { courses, loading, error, fetchCourses, setPlayedCourses } =
    useCourseSearch(false);
  const { inputRef, handleChange, handleCourseSelect } =
    useCourseSearchHandler(fetchCourses);
  const [clickedCourse, setClickedCourse] = useState<CourseType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCourseClick = (course: CourseType) => {
    setClickedCourse(course);
    setModalOpen(true);
  };

  useEffect(() => {
    !modalOpen && setClickedCourse(null);
  }, [modalOpen]);

  return (
    <div>
      <form className={styles.searchForm}>
        <div className={styles.searchFormatWrapper}>
          <div
            className={`${styles.searchInputsWrapper} ${
              !!inputRef.current?.value && styles.active
            }`}
          >
            <input
              className={`${styles.searchInput}`}
              type="text"
              placeholder="Search For Courses"
              ref={inputRef}
              onChange={handleChange}
            />
          </div>
          <SearchResults
            active={!!inputRef.current?.value || false}
            courses={courses}
            courseCB={handleCourseClick}
          />
        </div>
      </form>
      {clickedCourse && (
        <CourseModal
          courseInfo={clickedCourse}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import styles from "../../AddScore.module.scss";
import { SearchResults } from "../SearchResults/SearchResults";
import { useCourseSearch } from "../../../../hooks/useCourseSearch";
import { useCourseSearchHandler } from "../../../../hooks/useCourseSearchHandler";
import { CourseType } from "../../../BrowseCourses/components/course/Course";

type PropsType = {
  setCourse: React.Dispatch<React.SetStateAction<CourseType | null>>;
  hasPlayed: boolean;
  course: CourseType | null;
  isSubmitted: boolean;
};

export const CourseSearch = ({
  setCourse,
  hasPlayed,
  course,
  isSubmitted,
}: PropsType) => {
  const { courses, loading, error, fetchCourses, setPlayedCourses } =
    useCourseSearch(hasPlayed);
  const { inputRef, handleChange, handleCourseSelect } =
    useCourseSearchHandler(fetchCourses);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    if (hasPlayed) {
      setIsSearching(true);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    fetchCourses("");
  }, [hasPlayed]);

  useEffect(() => {
    if (!course && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [course]);

  useEffect(() => {
    setPlayedCourses(null);
  }, [isSubmitted]);

  const handleChangeClick = () => {
    setCourse(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    fetchCourses("");
  };

  return (
    <div>
      <h2 className={styles.questionTitle}>
        {hasPlayed
          ? "Search for a course you've played:"
          : "Search all courses or add a new one:"}
      </h2>
      {!hasPlayed && (
        <SearchOptionBtns
          setIsSearching={setIsSearching}
          isSearching={isSearching}
          course={course}
        />
      )}
      {isSearching ? (
        <div>
          <div className={styles.courseInputWrapper}>
            <input
              ref={inputRef}
              onChange={() => !course && handleChange()}
              className={`${styles.courseInput} ${hasPlayed && styles.played} ${
                !!course ? styles.picked : styles.dropDown
              }`}
              type="text"
              readOnly={!!course || (loading && hasPlayed)}
              placeholder={
                loading && hasPlayed ? "Loading Played Courses" : "Search..."
              }
            />
            {!!course && (
              <button
                className={`${styles.changeBtn} ${!hasPlayed && styles.played}`}
                onClick={handleChangeClick}
              >
                Change
              </button>
            )}
          </div>
          <SearchResults
            courses={courses}
            courseCB={(course) => handleCourseSelect(course, setCourse)}
            active={!course}
          />
        </div>
      ) : (
        "ADD Form"
      )}
    </div>
  );
};

type SearchOptionBtnsProps = {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  isSearching: boolean;
  course: CourseType | null;
};

const SearchOptionBtns = ({
  setIsSearching,
  isSearching,
  course,
}: SearchOptionBtnsProps) => {
  return (
    <div className={`${styles.searchOptions} ${!!course && styles.inactive}`}>
      <button
        onClick={() => setIsSearching(true)}
        className={`${styles.searchOption} ${isSearching && styles.active} ${
          !!course && styles.inactive
        }`}
        type="button"
      >
        Search
      </button>
      <button
        onClick={() => setIsSearching(false)}
        className={`${styles.searchOption} ${!isSearching && styles.active} ${
          !!course && styles.inactive
        }`}
        type="button"
      >
        Add
      </button>
    </div>
  );
};

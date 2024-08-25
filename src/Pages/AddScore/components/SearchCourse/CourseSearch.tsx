import { useEffect, useState } from "react";
import styles from "../../AddScore.module.scss";
import { SearchResults } from "../SearchResults/SearchResults";
import { useCourseSearch } from "../../../../hooks/useCourseSearch";
import { useCourseSearchHandler } from "../../../../hooks/useCourseSearchHandler";
import { CourseType } from "../../../BrowseCourses/components/course/Course";

type PropsType = {
  setCourse: React.Dispatch<React.SetStateAction<CourseType | null>>;
  hasPlayed: boolean;
};

export const CourseSearch = ({ setCourse, hasPlayed }: PropsType) => {
  const userId = "1";
  const { courses, loading, error, fetchCourses } = useCourseSearch(
    hasPlayed,
    userId
  );

  const {
    inputRef,
    handleChange,
    handleCourseSelect,
    isCoursePicked,
    setIsCoursePicked,
  } = useCourseSearchHandler(fetchCourses);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    if (hasPlayed) {
      setIsSearching(true);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setIsCoursePicked(false);
    fetchCourses("");
  }, [hasPlayed]);

  const handleChangeClick = () => {
    setIsCoursePicked(false);
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
          isCoursePicked={isCoursePicked}
        />
      )}
      {isSearching ? (
        <div>
          <div className={styles.courseInputWrapper}>
            <input
              ref={inputRef}
              onChange={() => !isCoursePicked && handleChange()}
              className={`${styles.courseInput} ${hasPlayed && styles.played} ${
                isCoursePicked ? styles.picked : styles.dropDown
              }`}
              type="text"
              readOnly={isCoursePicked || (loading && hasPlayed)}
              placeholder={
                loading && hasPlayed ? "Loading Played Courses" : "Search..."
              }
            />
            {isCoursePicked && (
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
            onCourseSelect={(course) => handleCourseSelect(course, setCourse)}
            active={!isCoursePicked}
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
  isCoursePicked: boolean;
};

const SearchOptionBtns = ({
  setIsSearching,
  isSearching,
  isCoursePicked,
}: SearchOptionBtnsProps) => {
  return (
    <div
      className={`${styles.searchOptions} ${isCoursePicked && styles.inactive}`}
    >
      <button
        onClick={() => setIsSearching(true)}
        className={`${styles.searchOption} ${isSearching && styles.active} ${
          isCoursePicked && styles.inactive
        }`}
        type="button"
      >
        Search
      </button>
      <button
        onClick={() => setIsSearching(false)}
        className={`${styles.searchOption} ${!isSearching && styles.active} ${
          isCoursePicked && styles.inactive
        }`}
        type="button"
      >
        Add
      </button>
    </div>
  );
};

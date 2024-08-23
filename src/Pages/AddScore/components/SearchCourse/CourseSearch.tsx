import { useEffect, useState } from "react";
import { CourseType } from "../../../BrowseCourses/components/course/Course";
import styles from "../../AddScore.module.scss";
import { SearchResults } from "../SearchResults/SearchResults";
import { useCourseSearch } from "../../../../hooks/useCourseSearch";
import { useCourseSearchHandler } from "../../../../hooks/useCourseSearchHandler";

type PropsType = {
  setCourse: React.Dispatch<React.SetStateAction<CourseType | null>>;
  hasPlayed: boolean;
};

export const CourseSearch = ({ setCourse, hasPlayed }: PropsType) => {
  const userId = "1";
  const {
    dropdownActive,
    query,
    inputRef,
    handleChange,
    handleCourseSelect,
    isCoursePicked,
    setIsCoursePicked,
  } = useCourseSearchHandler();
  const { courses, loading, error, setCourses } = useCourseSearch(
    query,
    hasPlayed,
    userId
  );
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    if (hasPlayed) {
      setIsSearching(true);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setCourses([]);
    setIsCoursePicked(false);
  }, [hasPlayed]);

  const handleUnlock = () => {
    setIsCoursePicked(false);
    setCourse(null);
    setCourses([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
              onChange={handleChange}
              className={`${styles.courseInput} ${hasPlayed && styles.round} ${
                isCoursePicked && styles.picked
              } ${dropdownActive && styles.dropDown}`}
              type="text"
              disabled={isCoursePicked || (loading && hasPlayed)}
              placeholder={loading && hasPlayed ? "Loading Played Courses" : ""}
            />
            {isCoursePicked && (
              <button
                className={`${styles.changeBtn} ${!hasPlayed && styles.played}`}
                onClick={handleUnlock}
              >
                Change
              </button>
            )}
          </div>
          <SearchResults
            courses={courses}
            onCourseSelect={(course) => handleCourseSelect(course, setCourse)}
            active={dropdownActive}
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

import { SearchResults } from "../../../AddScore/components/SearchResults/SearchResults";
import { CourseType } from "../course/Course";
import styles from "./SearchForm.module.scss";

type SearchFormProps = {
  loadedCourses: CourseType[];
};

export const SearchForm = ({ loadedCourses }: SearchFormProps) => {
  return (
    <form className={styles.searchForm}>
      <div className={styles.searchFormatWrapper}>
        <div className={styles.searchInputsWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search By Name..."
          ></input>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search By City..."
          ></input>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search By State..."
          ></input>
        </div>
        <SearchResults active={false} courses={loadedCourses} />
      </div>
    </form>
  );
};

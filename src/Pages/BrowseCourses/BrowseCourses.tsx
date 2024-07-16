import Nav from "../../components/Nav/Nav";
import styles from "./BrowseCourses.module.scss";

export const BrowseCourses = () => {
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
          <h2 className={styles.coursesTitle}>Most Played Courses</h2>
          <div className={styles.coursesWrapper}>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
            <div className={styles.course}>
              <div>
                <h2 className={styles.courseName}>Meadow Park Golf Course</h2>
                <h3 className={styles.courseLoc}>Lakewood Washington</h3>
              </div>
              <h2 className={styles.courseCTA}>Click To See More</h2>
              <div>
                <h2 className={styles.coursePlays}>Total Plays: 50</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

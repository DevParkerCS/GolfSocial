import Nav from "../../components/Nav/Nav";
import styles from "./Profile.module.scss";
import avatar from "../../assets/avatar.jpg";

export const Profile = () => {
  return (
    <div className={styles.contentWrapper}>
      <Nav />
      <div className={styles.mainContentWrapper}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileNav}>
            <div className={`${styles.profileNavItem} ${styles.activeNav}`}>
              <h2>Profile</h2>
            </div>
            <div className={styles.profileNavItem}>
              <h2>Courses</h2>
            </div>
            <div className={styles.profileNavItem}>
              <h2>Posts</h2>
            </div>
            <div className={styles.profileNavItem}>
              <h2>Settings</h2>
            </div>
          </div>
          <div className={styles.profileInfo}>
            <div>
              <img className={styles.profileImg} src={avatar} />
            </div>
            <div>
              <h2 className={styles.profileNameLabel}>Username:</h2>
              <p className={styles.profileNameInput}>Th3RedMan</p>
              <button>Edit</button>
            </div>
          </div>

          <div className={styles.profileStatsWrapper}>
            <div className={styles.scoreStats}>
              <h2 className={styles.scoreStatsTitle}>Score Stats</h2>
              <h2 className={styles.scoreStat}>Average Score: 86</h2>
              <h2 className={styles.scoreStat}>Lowest Score: 72</h2>
              <h2 className={styles.scoreStat}>Highest Score: 110</h2>
            </div>
            <div className={styles.courseStats}>
              <h2 className={styles.courseStatsTitle}>Course Stats</h2>
              <div>
                <h2 className={styles.courseStat}>
                  Most Played Course: Meadow Park Golf Course
                </h2>
              </div>
              <div>
                <h2 className={styles.courseStat}>
                  Lowest Round Course: Meadow Park Golf Course
                </h2>
              </div>
              <div>
                <h2 className={styles.courseStat}>
                  Highest Round Course: Meadow Park Golf Course
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import styles from "./LandingRecents.module.scss";

const LandingRecents = () => {
  return (
    <div>
      <section className={styles.recentPostsSection}>
        <h2 className={styles.recentPostsTitle}>Top Posts Of The Week</h2>
        <div className={styles.recentPostsWrapper}>
          <div className={styles.recentPost}>
            <h2 className={styles.recentTitle}>Title</h2>
            <h3 className={styles.recentUser}>@user</h3>
            <br />
            <p className={styles.recentTxt}>
              Here is an example posting on this really awesome website yay!
            </p>
          </div>
          <div className={styles.recentPost}>
            <h2 className={styles.recentTitle}>Title</h2>
            <h3 className={styles.recentUser}>@user</h3>
            <br />
            <p className={styles.recentTxt}>
              Here is an example posting on this really awesome website yay!
            </p>
          </div>
          <div className={styles.recentPost}>
            <h2 className={styles.recentTitle}>Title</h2>
            <h3 className={styles.recentUser}>@user</h3>
            <br />
            <p className={styles.recentTxt}>
              Here is an example posting on this really awesome website yay!
              fdafdafdfafdafdaffdfafda f dafd af da fa df
            </p>
          </div>
        </div>
        <p className={styles.recentCTA}>
          Check Out The Most Recent Posts <a>Here</a>
        </p>
      </section>
      <section className={styles.recentScoresSection}>
        <h2 className={styles.recentPostsTitle}>Recent Scores</h2>
        <div className={styles.recentPostsWrapper}>
          <div className={styles.recentPost}>
            <h2 className={styles.recentTitle}>Golf Course</h2>
            <h3 className={styles.recentUser}>Location</h3>
            <br />
            <p className={styles.recentTxt}>Today I shot a 87!</p>
          </div>
          <div className={styles.recentPost}>
            <h2 className={styles.recentTitle}>Golf Course</h2>
            <h3 className={styles.recentUser}>Location</h3>
            <br />
            <p className={styles.recentTxt}>Today I shot a 87!</p>
          </div>
          <div className={styles.recentPost}>
            <h2 className={styles.recentTitle}>Golf Course</h2>
            <h3 className={styles.recentUser}>Location</h3>
            <br />
            <p className={styles.recentTxt}>Today I shot a 87!</p>
          </div>
        </div>
        <p className={styles.recentCTA}>
          Want To Post Your Own Score? Do It Right <a>Here</a>
        </p>
      </section>
    </div>
  );
};

export default LandingRecents;

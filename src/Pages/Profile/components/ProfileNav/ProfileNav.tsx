import styles from "./ProfileNav.module.scss";

type ProfileNavProps = {
  ownsProfile: boolean;
};

export const ProfileNav = ({ ownsProfile }: ProfileNavProps) => {
  return (
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
      {ownsProfile ? (
        <div className={styles.profileNavItem}>
          <h2>Settings</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

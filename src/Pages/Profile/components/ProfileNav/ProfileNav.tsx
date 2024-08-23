import styles from "./ProfileNav.module.scss";

type ProfileNavProps = {
  ownsProfile: boolean;
  setTabSelected: React.Dispatch<React.SetStateAction<number>>;
  tabSelected: number;
};

export const ProfileNav = ({
  ownsProfile,
  setTabSelected,
  tabSelected,
}: ProfileNavProps) => {
  return (
    <div className={styles.profileNav}>
      <div
        className={`${styles.profileNavItem} ${
          tabSelected === 0 ? styles.activeNav : ""
        }`}
        onClick={() => setTabSelected(0)}
      >
        <h2>Profile</h2>
      </div>
      <div
        className={`${styles.profileNavItem} ${
          tabSelected === 1 ? styles.activeNav : ""
        }`}
        onClick={() => setTabSelected(1)}
      >
        <h2>Courses</h2>
      </div>
      <div
        className={`${styles.profileNavItem} ${
          tabSelected === 2 ? styles.activeNav : ""
        }`}
        onClick={() => setTabSelected(2)}
      >
        <h2>Posts</h2>
      </div>
      {ownsProfile ? (
        <div
          className={`${styles.profileNavItem} ${
            tabSelected === 3 ? styles.activeNav : ""
          }`}
          onClick={() => setTabSelected(3)}
        >
          <h2>Settings</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

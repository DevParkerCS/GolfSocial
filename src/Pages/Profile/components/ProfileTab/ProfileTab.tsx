import { PublicUserType } from "../../../../types/UserTypes";
import styles from "./ProfileTab.module.scss";

type ProfileTabProps = {
  user: PublicUserType | null;
};

export const ProfileTab = ({ user }: ProfileTabProps) => {
  return (
    <div className={styles.profileStatsWrapper}>
      <div className={styles.scoreStats}>
        <h2 className={styles.scoreStatsTitle}>Score Stats</h2>
        <h2 className={styles.statWrapper}>
          Total Rounds Played:{" "}
          <span className={styles.stat}>{user?.totalPlays ?? "N/A"}</span>
        </h2>
        <h2 className={styles.statWrapper}>
          Lowest Score:{" "}
          <span className={styles.stat}>{user?.lowScore ?? "N/A"}</span>
        </h2>
        <h2 className={styles.statWrapper}>
          Highest Score:{" "}
          <span className={styles.stat}>{user?.highScore ?? "N/A"}</span>
        </h2>
        <h2 className={styles.statWrapper}>
          Average Score:{" "}
          <span className={styles.stat}>
            {user?.totalPlays ? user?.totalScoreSum / user?.totalPlays : "N/A"}
          </span>
        </h2>
      </div>
      <div className={styles.courseStats}>
        <h2 className={styles.courseStatsTitle}>Course Stats</h2>
        <div>
          <h2 className={styles.statWrapper}>
            Lowest Round Course:{" "}
            <span className={styles.stat}>
              {user?.lowRound?.courseName ?? "N/A"}
            </span>
          </h2>
        </div>
        <div>
          <h2 className={styles.statWrapper}>
            Highest Round Course:{" "}
            <span className={styles.stat}>
              {user?.highRound?.courseName ?? "N/A"}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

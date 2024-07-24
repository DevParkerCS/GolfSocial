import Nav from "../../components/Nav/Nav";
import styles from "./Profile.module.scss";
import avatar from "../../assets/avatar.jpg";
import { useState } from "react";
import { ProfileNav } from "./components/ProfileNav/ProfileNav";

export const Profile = () => {
  const [ownsProfile, setOwnsProfile] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(150);
  const [followingCount, setFollowingCount] = useState(130);

  const handleFollowClick = () => {
    if (isFollowed) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div className={styles.contentWrapper}>
      <Nav />
      <div className={styles.mainContentWrapper}>
        <div className={styles.profileWrapper}>
          <ProfileNav ownsProfile={ownsProfile} />
          <div className={styles.profileInfo}>
            <div className={styles.profileNameWrapper}>
              <p className={styles.profileNameInput}>Th3RedMan</p>
            </div>
            <div className={styles.followInfoWrapper}>
              <div className={styles.followInfo}>
                <div className={styles.followItem}>
                  <h2 className={styles.followTitle}>Followers</h2>
                  <h2 className={styles.followCount}>{followerCount}</h2>
                </div>
                <div className={styles.followItem}>
                  <h2 className={styles.followTitle}>Following</h2>
                  <h2 className={styles.followCount}>{followingCount}</h2>
                </div>
              </div>
              {ownsProfile ? (
                <button
                  onClick={handleFollowClick}
                  className={`${styles.followBtn} ${
                    isFollowed ? styles.isFollowed : ""
                  }`}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleFollowClick}
                  className={`${styles.followBtn} ${
                    isFollowed ? styles.isFollowed : ""
                  }`}
                >
                  {isFollowed ? "Following" : "Follow"}
                </button>
              )}
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

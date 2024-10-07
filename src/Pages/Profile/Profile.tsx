import Nav from "../../components/Nav/Nav";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { ProfileNav } from "./components/ProfileNav/ProfileNav";
import { PostList } from "../Posts/components/PostList";
import { PublicUserType } from "../../types/UserTypes";
import { useParams } from "react-router-dom";
import { ProfileInfo } from "./components/ProfileInfo/ProfileInfo";
import { useUser } from "../../hooks/useUser";

export const Profile = () => {
  const { userId, user } = useUser();
  const { profileId } = useParams();
  const [ownsProfile, setOwnsProfile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [activeUserInfo, setActiveUserInfo] = useState<PublicUserType | null>(
    null
  );
  const [tabSelected, setTabSelected] = useState(0);

  useEffect(() => {
    setOwnsProfile(profileId === userId);
  }, [userId, profileId]);

  return (
    <div className={styles.contentWrapper}>
      <Nav />
      <div className={styles.mainContentWrapper}>
        <div className={styles.roundedWrapper}>
          <div className={styles.profileWrapper}>
            <ProfileNav
              ownsProfile={ownsProfile}
              setTabSelected={setTabSelected}
              tabSelected={tabSelected}
            />
            <ProfileInfo
              ownsProfile={ownsProfile}
              activeUserInfo={activeUserInfo}
              isFollowed={isFollowed}
              setActiveUserInfo={setActiveUserInfo}
              setIsFollowed={setIsFollowed}
            />
            {tabSelected === 0 ? <ProfileTab user={user} /> : ""}
            {tabSelected === 2 ? (
              <div className={styles.profilePostsWrapper}>
                <PostList userId={userId} inProfile={true} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type ProfileTabProps = {
  user: PublicUserType | null;
};

const ProfileTab = ({ user }: ProfileTabProps) => {
  return (
    <div className={styles.profileStatsWrapper}>
      <div className={styles.scoreStats}>
        <h2 className={styles.scoreStatsTitle}>Score Stats</h2>
        <h2 className={styles.scoreStat}>
          Total Rounds Played: {user?.totalPlays ?? "N/A"}
        </h2>
        <h2 className={styles.scoreStat}>
          Lowest Score: {user?.lowScore ?? "N/A"}
        </h2>
        <h2 className={styles.scoreStat}>
          Highest Score: {user?.highScore ?? "N/A"}
        </h2>
      </div>
      <div className={styles.courseStats}>
        <h2 className={styles.courseStatsTitle}>Course Stats</h2>
        <div>
          <h2 className={styles.courseStat}>
            Most Played Course: {user?.mostPlayed?.courseName ?? "N/A"}
          </h2>
        </div>
        <div>
          <h2 className={styles.courseStat}>
            Lowest Round Course: {user?.lowRound?.courseName ?? "N/A"}
          </h2>
        </div>
        <div>
          <h2 className={styles.courseStat}>
            Highest Round Course: {user?.highRound?.courseName ?? "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};

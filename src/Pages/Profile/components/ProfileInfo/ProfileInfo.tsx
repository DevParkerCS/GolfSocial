import { PublicUserType } from "../../../../types/UserTypes";
import { useUser } from "../../../../hooks/useUser";
import styles from "./ProfileInfo.module.scss";

type ProfileInfoProps = {
  ownsProfile: boolean;
  isFollowed: boolean;
  activeUserInfo: PublicUserType | null;
  setIsFollowed: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveUserInfo: React.Dispatch<
    React.SetStateAction<PublicUserType | null>
  >;
};

export const ProfileInfo = ({
  ownsProfile,
  isFollowed,
  setIsFollowed,
  setActiveUserInfo,
  activeUserInfo,
}: ProfileInfoProps) => {
  const { user } = useUser();

  const handleFollowClick = () => {
    if (isFollowed) {
      setActiveUserInfo((prev) => {
        if (prev) {
          return { ...prev, numFollowers: prev.numFollowers - 1 };
        } else {
          return null;
        }
      });
    } else {
      setActiveUserInfo((prev) => {
        if (prev) {
          return { ...prev, numFollowers: prev.numFollowers + 1 };
        } else {
          return null;
        }
      });
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div className={styles.profileInfoWrapper}>
      <div className={styles.profileInfo}>
        <div className={styles.profileNameWrapper}>
          <p className={styles.profileNameInput}>{user?.username}</p>
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
        <div className={styles.followInfoWrapper}>
          <div className={styles.followInfo}>
            <div className={styles.followItem}>
              <p className={styles.followCount}>{user?.numFollowers}</p>
              <p className={styles.followTitle}>Followers</p>
            </div>
            <div className={styles.followItem}>
              <p className={styles.followCount}>{user?.numFollowing}</p>
              <p className={styles.followTitle}>Following</p>
            </div>
          </div>
        </div>
        <p className={styles.profileBio}>
          Avid golfer that just loves playing golf!
        </p>
      </div>
    </div>
  );
};

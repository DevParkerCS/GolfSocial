import Nav from "../../components/Nav/Nav";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { ProfileNav } from "./components/ProfileNav/ProfileNav";
import { PostList } from "../Posts/components/PostList";
import { PublicUserType } from "../../types/UserTypes";
import { useParams } from "react-router-dom";
import { ProfileInfo } from "./components/ProfileInfo/ProfileInfo";
import { useUser } from "../../hooks/useUser";
import { fetchPublicProfile } from "../../Util/UserAPI";
import { ProfileTab } from "./components/ProfileTab/ProfileTab";

export const Profile = () => {
  const { userId, user } = useUser();
  const { profileId } = useParams();
  const [ownsProfile, setOwnsProfile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [activeUserInfo, setActiveUserInfo] = useState<PublicUserType | null>(
    null
  );
  const [tabSelected, setTabSelected] = useState(0);

  const fetchProfile = async () => {
    if (profileId) {
      try {
        const userInfo = await fetchPublicProfile(profileId);
        setActiveUserInfo(userInfo);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (profileId === userId) {
      setOwnsProfile(true);
      setActiveUserInfo(user);
    } else if (profileId) {
      setOwnsProfile(false);
      try {
        fetchProfile();
      } catch (err) {
        console.log("err");
      }
    }
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
            {tabSelected === 0 ? <ProfileTab user={activeUserInfo} /> : ""}
            {tabSelected === 2 ? (
              <div className={styles.profilePostsWrapper}>
                <PostList userId={profileId} inProfile={true} />
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

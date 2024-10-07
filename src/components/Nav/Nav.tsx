import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";

const Nav = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <nav className={styles.navWrapper}>
      <h2 className={styles.navTitle} onClick={() => navigate("/")}>
        GOLFHub
      </h2>
      <div className={styles.navListWrapper}>
        <ul className={styles.navList}>
          <li
            className={styles.navListItem}
            onClick={() => navigate("/courses")}
          >
            All Courses
          </li>
          <li className={styles.navListItem}>Explore Profiles</li>
          <li className={styles.navListItem} onClick={() => navigate("/posts")}>
            Posts
          </li>
          <li
            className={styles.navListItem}
            onClick={() => navigate("/scores")}
          >
            Scores
          </li>
          {isLoggedIn ? (
            <>
              <li
                className={styles.navListItem}
                onClick={() => navigate(`/profile/${user?._id}`)}
              >
                Your Profile
              </li>
              <li className={styles.navListItem}>Logout</li>
            </>
          ) : (
            <li
              className={`${styles.navListItem}`}
              onClick={() => navigate("/login")}
            >
              Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

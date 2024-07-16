import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import { useState } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
            onClick={() => navigate("/addscore")}
          >
            Add Score
          </li>
          {isLoggedIn ? (
            <>
              <li
                className={styles.navListItem}
                onClick={() => navigate("/profile")}
              >
                Your Profile
              </li>
              <li className={styles.navListItem}>Logout</li>
            </>
          ) : (
            <li className={`${styles.navListItem}`}>Login</li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

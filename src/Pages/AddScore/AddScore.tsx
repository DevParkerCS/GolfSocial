import { useState } from "react";
import styles from "./AddScore.module.scss";
import Nav from "../../components/Nav/Nav";

export const AddScore = () => {
  const [hasPlayedCourse, setHasPlayedCourse] = useState(false);
  const [hasLoadedCourses, setHasLoadedCourses] = useState(false);

  const handleChange = () => {
    setHasPlayedCourse(!hasPlayedCourse);
  };

  return (
    <div>
      <Nav />
      <div className={styles.mainWrapper}>
        <h1>Add A New Score To Your Stats</h1>
        <h2>Have You Played This Course Before?</h2>
        <form>
          <label>
            <input
              type="radio"
              value={"yes"}
              checked={hasPlayedCourse}
              onChange={handleChange}
            />
            YES
          </label>
          <label>
            <input
              type="radio"
              value={"no"}
              checked={!hasPlayedCourse}
              onChange={handleChange}
            />
            NO
          </label>
          {hasPlayedCourse ? (
            <div>Played Course</div>
          ) : (
            <div>Hasn't Played Course</div>
          )}
          <h2>Enter Your Score</h2>
          <input placeholder="72" required type="number"></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

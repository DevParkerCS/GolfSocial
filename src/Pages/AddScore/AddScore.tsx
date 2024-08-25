import { useEffect, useState } from "react";
import styles from "./AddScore.module.scss";
import Nav from "../../components/Nav/Nav";
import { CourseSearch } from "./components/SearchCourse/CourseSearch";
import { CheckMarksBtn } from "../../components/CheckMarks/CheckMarks";
import { PostPreview } from "./components/PostPreview/PostPreview";
import axios from "axios";
import { CourseType } from "../BrowseCourses/components/course/Course";

export const AddScore = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [score, setScore] = useState("");
  const [course, setCourse] = useState<CourseType | null>(null);
  const [makePost, setMakePost] = useState(false);
  const userId = "1";

  useEffect(() => {
    setCourse(null);
    setMakePost(false);
    setScore("");
  }, [hasPlayed]);

  const handleSubmit = async () => {
    const updateData = {
      courseId: course?.courseId,
      courseName: course?.courseName,
      courseCity: course?.courseCity,
      courseState: course?.courseState,
      score: parseInt(score),
    };
    try {
      await axios.put(
        `http://localhost:3000/playedCourses/${userId}`,
        updateData
      );
      console.log("done");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.addScoreWrapper}>
      <Nav />
      <h1 className={styles.addScoreTitle}>Add Your Golf Score</h1>

      <div className={styles.questionSection}>
        <h2 className={styles.questionTitle}>
          Have you played this course before?
        </h2>
        <CheckMarksBtn
          yesBool={hasPlayed}
          yesCb={() => setHasPlayed(true)}
          noCb={() => setHasPlayed(false)}
        />
      </div>

      <div className={styles.courseSearchWrapper}>
        <CourseSearch setCourse={setCourse} hasPlayed={hasPlayed} />
      </div>

      {course && (
        <div className={styles.scoreEntryWrapper}>
          <h2 className={styles.questionTitle}>Enter your score:</h2>
          <input
            type="number"
            placeholder="72"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className={styles.scoreInput}
          />
        </div>
      )}

      {score && course && (
        <div className={styles.postSection}>
          <h2 className={styles.postTitle}>
            Would you like to make a post about this score?
          </h2>
          <CheckMarksBtn
            yesBool={makePost}
            yesCb={() => setMakePost(true)}
            noCb={() => setMakePost(false)}
          />
          {makePost && (
            <div className={styles.previewContentWrapper}>
              <h2>Post Preview:</h2>
              <div className={styles.previewWrapper}>
                <PostPreview
                  title="New Low Score"
                  text="I just shot my lowest score of 87 at Pebble Beach Golf Course"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {score && course && (
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Submit Score
        </button>
      )}
    </div>
  );
};

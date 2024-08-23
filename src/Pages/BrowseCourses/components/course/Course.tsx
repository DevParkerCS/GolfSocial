import { useState } from "react";
import styles from "./Course.module.scss";
import { CourseModal } from "../../../../components/CourseModal/CourseModal";

export type CourseType = {
  name: string;
  state: string;
  city: string;
  par: number;
  yards: number;
  totalPlays: number;
  lowestScore: number;
  highestScore: number;
  totalScores: number;
  _id: string;
};

type CourseProps = {
  courseInfo: CourseType;
};

export const Course = ({ courseInfo }: CourseProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.courseWrapper}>
      <CourseModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        courseInfo={courseInfo}
      />

      <div className={styles.course} onClick={() => setModalOpen(true)}>
        <div>
          <h2 className={styles.courseName}>{courseInfo.name}</h2>
          <h3 className={styles.courseLoc}>
            {courseInfo.city}, {courseInfo.state}
          </h3>
        </div>
        <h2 className={styles.courseCTA}>Click To See More</h2>
        <h2 className={styles.coursePlays}>
          Total Plays: {courseInfo.totalPlays || 0}
        </h2>
      </div>
    </div>
  );
};

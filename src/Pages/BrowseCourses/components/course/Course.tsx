import { useEffect, useState } from "react";
import styles from "./Course.module.scss";
import { CourseModal } from "../../../../components/CourseModal/CourseModal";

export type CourseType = {
  courseId: string;
  courseName: string;
  courseCity: string;
  courseState: string;
  courseYards: number;
  coursePar: number;
  lowestScore: number;
  highestScore: number;
  totalTimesPlayed: number;
  totalScoreSum: number;
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
          <h2 className={styles.courseName}>{courseInfo.courseName}</h2>
          <h3 className={styles.courseLoc}>
            {courseInfo.courseCity}, {courseInfo.courseState}
          </h3>
        </div>
        <h2 className={styles.courseCTA}>Click To See More</h2>
        <h2 className={styles.coursePlays}>
          Total Plays: {courseInfo.totalTimesPlayed || 0}
        </h2>
      </div>
    </div>
  );
};

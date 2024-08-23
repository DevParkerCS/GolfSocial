import { CourseType } from "../../Pages/BrowseCourses/components/course/Course";
import styles from "./CourseModal.module.scss";

type CourseModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  courseInfo: CourseType;
};

export const CourseModal = ({
  setModalOpen,
  modalOpen,
  courseInfo,
}: CourseModalProps) => {
  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Check if the click happened on the modalOutsideWrapper, not its children
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className={`${styles.modalOutsideWrapper} ${
        modalOpen ? styles.active : ""
      }`}
      onClick={handleClickOutside}
    >
      <div
        className={`${styles.modalWrapper} ${modalOpen ? styles.active : ""}`}
      >
        <div
          className={styles.exitBtn}
          aria-label="Close"
          onClick={() => setModalOpen(false)}
        >
          &times;
        </div>
        <h2 className={styles.title}>{courseInfo.name}</h2>
        <h3 className={styles.location}>
          {courseInfo.city}, {courseInfo.state}
        </h3>
        <div className={styles.modalInfoWrapper}>
          <div>
            <h3 className={styles.genInfo}>
              Yardage: {courseInfo.yards} yards
            </h3>
            <h3 className={styles.genInfo}>Par: {courseInfo.par}</h3>
            <h3 className={styles.genInfo}>
              Total Plays: {courseInfo.totalPlays || 0}
            </h3>
          </div>
          <div>
            <h3 className={styles.genInfo}>
              Lowest Score: {courseInfo.lowestScore || "N/A"}
            </h3>
            <h3 className={styles.genInfo}>
              Highest Score: {courseInfo.highestScore || "N/A"}
            </h3>
            <h3 className={styles.genInfo}>
              Average Score:{" "}
              {courseInfo.totalScores / courseInfo.totalPlays || "N/A"}
            </h3>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.playedBtn}>
            Want To Add A Score For This Course?
          </button>
        </div>
      </div>
    </div>
  );
};

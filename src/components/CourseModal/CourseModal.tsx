import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CourseType } from "../../Pages/BrowseCourses/components/course/Course";
import styles from "./CourseModal.module.scss";
import StarRating from "./components/StarRating/StarRating";
import { faC, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

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
  const [dropdownActive, setDropdownActive] = useState(false);
  const [modalWidth, setModalWidth] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDropdownActive(false);
    if (modalRef.current) {
      setModalWidth(modalRef.current.offsetWidth);
    }
  }, [modalOpen]);

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
        className={`${styles.modalWrapper} ${modalOpen && styles.active} ${
          dropdownActive && styles.dropdownActive
        }`}
        ref={modalRef}
      >
        <div
          className={styles.exitBtn}
          aria-label="Close"
          onClick={() => setModalOpen(false)}
        >
          &times;
        </div>
        <h2 className={styles.title}>{courseInfo.courseName}</h2>
        <h3 className={styles.location}>
          {courseInfo.courseCity}, {courseInfo.courseState}
        </h3>
        <StarRating rating={4.5} />

        <div className={styles.modalInfoWrapper}>
          <div>
            <h3 className={styles.genInfo}>
              Yardage: {courseInfo.courseYards} yards
            </h3>
            <h3 className={styles.genInfo}>Par: {courseInfo.coursePar}</h3>
            <h3 className={styles.genInfo}>
              Total Plays: {courseInfo.totalTimesPlayed || 0}
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
              {Math.floor(
                courseInfo.totalScoreSum / courseInfo.totalTimesPlayed
              ) || "N/A"}
            </h3>
          </div>
        </div>

        <div className={styles.btnWrapper}>
          <button
            className={styles.reviewsBtn}
            onClick={() => setDropdownActive(!dropdownActive)}
          >
            {dropdownActive ? "Hide" : "Show"} Reviews
            <FontAwesomeIcon
              className={styles.dropdownBtn}
              icon={dropdownActive ? faCaretUp : faCaretDown}
            />
          </button>
          <button className={`${styles.reviewsBtn} ${styles.addReviewBtn}`}>
            Add Review
          </button>
        </div>
        {dropdownActive && (
          <div className={styles.reviewsWrapper}>
            <Review />
            <Review2 modalWidth={modalWidth} />
            <Review />
          </div>
        )}
      </div>
    </div>
  );
};

const Review = () => {
  return (
    <div className={styles.reviewWrapper}>
      <h3 className={styles.reviewUsername}>@Username</h3>
      <StarRating rating={3} />
      <p className={styles.reviewTxt}>
        Yea this is a great course! Definetely have to play here!
      </p>
    </div>
  );
};

const Review2 = ({ modalWidth = 0 }) => {
  return (
    <div className={styles.reviewWrapper}>
      <h3 className={styles.reviewUsername}>@Username</h3>
      <StarRating rating={4} />
      <p
        className={styles.reviewTxt}
        style={{ maxWidth: `calc(${modalWidth}px - 4rem)` }}
      >
        Yea this is a great course! Definetely have to play here! Yea this is a
        great course! Definetely have to play here!Yea this is a great course!
        Definetely have to play here!Yea this is a great course! Definetely have
        to play here!Yea this is a great course! Definetely have to play
        here!Yea this is a great course! Definetely have to play here!
      </p>
    </div>
  );
};

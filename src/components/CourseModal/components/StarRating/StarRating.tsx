import styles from "./StarRating.module.scss";
import {
  FaRegStar as EmptyStar,
  FaStar as FilledStar,
  FaStarHalfAlt,
} from "react-icons/fa";

const StarRating = ({ rating = 0, maxRating = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const half = i === Math.ceil(rating) && rating % 1 !== 0;
    stars.push(<Star key={i} filled={i <= rating} half={half} />);
  }

  return <div>{stars}</div>;
};

const Star = ({ filled = false, half = false }) => {
  return (
    <span>
      {filled ? (
        <FilledStar className={`${styles.star} ${styles.filledStar}`} />
      ) : half ? (
        <FaStarHalfAlt className={`${styles.star} ${styles.filledStar}`} />
      ) : (
        <EmptyStar className={`${styles.star}`} />
      )}
    </span>
  );
};

export default StarRating;

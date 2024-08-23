import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Spinner.module.scss";

type Props = {
  light?: boolean;
};

export const Spinner = ({ light }: Props) => {
  return (
    <FontAwesomeIcon
      className={`${styles.spinner} ${light ? styles.light : ""}`}
      icon={faSpinner}
    />
  );
};

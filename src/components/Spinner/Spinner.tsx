import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return <FontAwesomeIcon className={styles.spinner} icon={faSpinner} />;
};

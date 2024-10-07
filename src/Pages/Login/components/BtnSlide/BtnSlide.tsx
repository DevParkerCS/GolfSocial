import styles from "./BtnSlide.module.scss";

type BtnSlideProps = {
  isSubmitting: boolean;
  txt: string;
};

export const BtnSlide = ({ isSubmitting, txt }: BtnSlideProps) => {
  return (
    <div className={styles.loginBtnWrapper}>
      <button type="submit" disabled={isSubmitting} className={styles.loginBtn}>
        <span>{txt}</span>
        <div className={styles.btnSlide}></div>
      </button>
    </div>
  );
};

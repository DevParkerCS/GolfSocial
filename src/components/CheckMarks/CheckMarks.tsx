import styles from "./CheckMarks.module.scss";

type CheckMarksBtnProps = {
  yesBool: boolean;
  yesCb: (...args: any[]) => any;
  noCb: (...args: any[]) => any;
};

export const CheckMarksBtn = ({ yesBool, yesCb, noCb }: CheckMarksBtnProps) => {
  return (
    <div className={styles.checkMarksWrapper}>
      <div className={styles.checkMarkWrapper} onClick={yesCb}>
        <div id="playedYes" className={styles.playedCheck}>
          {yesBool ? <>&#10004;</> : ""}
        </div>
        <p className={styles.playedCheckLabel}>Yes</p>
      </div>
      <div className={styles.checkMarkWrapper} onClick={noCb}>
        <div id="playedNo" className={styles.playedCheck}>
          {!yesBool ? <>&#10004;</> : ""}
        </div>
        <p className={styles.playedCheckLabel}>No</p>
      </div>
    </div>
  );
};

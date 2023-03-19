import CountInput from "../countInput/CountInput";
import styles from "./count.module.css";

type CountProps = {
  maxNum: number;
  addMaxNum: (num: number) => void;
  startNum: number;
  addStartNum: (num: number) => void;
  error: string;
  counterMode: string;
};

export const Count = (props: CountProps) => {
  const { maxNum, addMaxNum, startNum, addStartNum, error, counterMode } =
    props;

  // Определение значения isMaxNumValid в зависимости от значений maxNum, startNum
  const isMaxNumValid = maxNum >= 0 && maxNum > startNum ? "" : error;

  // Определение значения isStartNumValid в зависимости от значений startNum, maxNum
  const isStartNumValid =
    (startNum >= 0 && maxNum < 0) || (startNum < maxNum && startNum > 0)
      ? ""
      : error;

  return (
    <div className={styles.count}>
      <div className={styles.inputFieldBlock}>
        <p className={styles.p_count}>МАКС. ЗНАЧЕНИЕ</p>
        <CountInput
          error={isMaxNumValid}
          value={maxNum}
          callBack={addMaxNum}
          counterMode={counterMode}
        />
      </div>
      <div className={styles.inputFieldBlock}>
        <p className={styles.p_count}>НАЧАЛЬНОЕ ЗНАЧЕНИЕ</p>

        <CountInput
          error={isStartNumValid}
          value={startNum}
          callBack={addStartNum}
          counterMode={counterMode}
        />
      </div>
    </div>
  );
};

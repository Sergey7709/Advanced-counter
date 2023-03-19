import styles from "./countInput.module.css";

type InputProps = {
  callBack: (num: number) => void;
  value: number;
  error: string;
  counterMode: string;
};

const CountInput = (props: InputProps) => {
  const { callBack, value, error, counterMode } = props;

  // Обработчик события изменения значения в инпуте
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.currentTarget.value);

    // Вызов функции обратного вызова только если режим счетчика не равен "valueIncrease" или "valueMaxReset"
    counterMode !== "valueIncrease" &&
      counterMode !== "valueMaxReset" &&
      callBack(num);
  };

  // Определение стилей для инпута
  const getInputStyle = `${styles.input} ${error ? styles.error : ""}`;

  return (
    <div>
      <input
        className={getInputStyle}
        type="number"
        value={value > 0 || value < 0 ? value : ""}
        placeholder="0"
        onChange={onChangeHandler}
      ></input>
    </div>
  );
};

export default CountInput;

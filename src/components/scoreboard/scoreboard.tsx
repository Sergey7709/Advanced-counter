import styles from "./scoreboard.module.css";

//Тип для компонента Scoreboard. Свойства включают:
//value: число, которое отображается на табло счетчика.
//error: строка, которая указывает на ошибку, возникшую при попытке установить значение.
//counterMode: строка, которая определяет текущий режим счетчика.

type scoreboardProps = {
  value: number;
  error: string;
  counterMode: string;
};

const Scoreboard = (props: scoreboardProps) => {
  const { value, error, counterMode } = props;

  // Определение класса для текста в зависимости от наличия ошибки или значения counterMode
  const classColor =
    error || counterMode === "valueMaxReset"
      ? styles.p_scoreboard_red
      : styles.p_scoreboard_white;

  // Определение значения valueTextOrNum в зависимости от значений counterMode, error и value
  const valueTextOrNum =
    counterMode === "valueSettingStart" && !error
      ? 'Установите начальное и максимальное значение, затем нажмите клавишу "ВВОД"'
      : counterMode === "valueSettingStart" && error
      ? "Ошибка введенное значение некорректно"
      : value;

  // Определение доп. класса для значения в зависимости от типа значения valueTextOrNum
  const classNum = typeof valueTextOrNum === "string" ? "" : styles.num;

  return (
    <div className={`${styles.scoreboard}`}>
      <span className={`${styles.span_scoreboard}`}>
        <p className={`${classColor} ${classNum}`}>{valueTextOrNum}</p>
      </span>
    </div>
  );
};

export default Scoreboard;

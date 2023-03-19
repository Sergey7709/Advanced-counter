import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Count } from "./components/count/Count";
import Button from "./components/countButton/CountButton";
import Scoreboard from "./components/scoreboard/scoreboard";

// Описание типа для вывода цифрового значения в компоненте Scoreboard
type ValueScoreboardType = number;

// Описание типа для режимов счетчика.
type CounterModeType =
  | "valueSettingStart"
  | "valueSending"
  | "valueIncrease"
  | "valueMaxReset";

// Описание типа для состояния кнопок.
type DisabledButtonState = {
  disabledButtonEnter: boolean;
  disabledButtonIncrement: boolean;
  disabledButtonReset: boolean;
};

//----------------------------------------

function App() {
  const [number, setNumber] = useState<number>(0);
  const [maxNum, setMaxNum] = useState<number>(0);
  const [startNum, setStartNum] = useState<number>(0);

  // Инициализация состояний счетчика

  const [valueScoreboardNum, setValueScoreboardNum] =
    useState<ValueScoreboardType>(0);

  const [counterMode, setCounterMode] =
    useState<CounterModeType>("valueSettingStart");

  // Инициализация состояний отключения кнопок

  const [disabledButton, setDisabledButton] = useState<DisabledButtonState>({
    disabledButtonEnter: true,
    disabledButtonIncrement: true,
    disabledButtonReset: true,
  });

  // Деструктуризация значений состояний отключения кнопок
  const { disabledButtonEnter, disabledButtonIncrement, disabledButtonReset } =
    disabledButton;

  // Инициализация состояний наличия ошибки

  const [error, setError] = useState<string>("");

  // Вызов функции сheckNum при изменении значений maxNum, startNum, number или counterMode

  useEffect(() => {
    updateCounter();

    // console.log(counterMode);
  }, [maxNum, startNum, number, counterMode]);

  // * -----------------------------------------
  // Проверка готовности отправки значения
  const valueReadyForSending =
    counterMode === "valueSettingStart" && maxNum > startNum && startNum >= 0;
  // Проверка неготовности отправки значения
  const valueNotReadyForSending =
    counterMode !== "valueMaxReset" &&
    ((maxNum > 0 && maxNum <= startNum) || maxNum < 0 || startNum < 0);
  // Проверка готовности сброса максимального значения
  const valueReadyMaxReset =
    counterMode === "valueIncrease" && number === maxNum && maxNum !== 0;
  // Проверка готовности установки нового начального значения
  const valueReadyNewSetStart = maxNum === 0 && counterMode !== "valueMaxReset";

  // *-------------------------------

  const updateCounter = () => {
    // Инициализация переменных для отключения кнопок
    let disabledButtonEnter = true;
    let disabledButtonIncrement = true;
    let disabledButtonReset = true;

    // Проверка режима счетчика
    switch (counterMode) {
      case "valueSettingStart":
        // Очистка сообщения об ошибке
        setError("");
        break;

      case "valueSending":
        // Установка значения табло и разблокировка кнопки "ВВОД"
        setValueScoreboardNum(number);
        disabledButtonEnter = false;
        setError("");
        break;

      case "valueIncrease":
        // Установка значения табло и разблокировка кнопок "ПРИБАВИТЬ" и "ОЧИСТИТЬ"
        setValueScoreboardNum(number);
        disabledButtonIncrement = false;
        disabledButtonReset = false;
        break;

      case "valueMaxReset":
        // Разблокировка кнопки "ОЧИСТИТЬ"
        disabledButtonReset = false;
        break;

      default:
        // Установка режима счетчика в значение по умолчанию
        setCounterMode("valueSettingStart");
    }

    // Обновление состояния отключения кнопок
    setDisabledButton({
      ...disabledButton,
      disabledButtonEnter,
      disabledButtonIncrement,
      disabledButtonReset,
    });

    //--------

    // Проверка условий для установки режима счетчика и сообщения об ошибке
    if (valueReadyForSending) {
      // Если значение готово к отправке, установить режим счетчика в "valueSending" и очистить сообщение об ошибке
      setCounterMode("valueSending");
      setError("");
    } else if (valueNotReadyForSending) {
      // Если значение не готово к отправке, установить режим счетчика в "valueSettingStart" и установить сообщение об ошибке
      setCounterMode("valueSettingStart");
      setError("error");
    } else if (valueReadyMaxReset) {
      // Если значение готово к сбросу максимального значения, установить режим счетчика в "valueMaxReset"
      setCounterMode("valueMaxReset");
    } else if (valueReadyNewSetStart) {
      // Если значение готово к новой установке начального значения, установить режим счетчика в "valueSettingStart"
      const localStorageMaxNum = localStorage.getItem("counterMaxNum");
      const localStorageStartNum = localStorage.getItem("counterStartNum");

      if (localStorageMaxNum) {
        setMaxNum(JSON.parse(localStorageMaxNum));
        setCounterMode("valueIncrease");
      }
      if (localStorageStartNum) {
        setStartNum(JSON.parse(localStorageStartNum));
        setCounterMode("valueIncrease");
      }
      setCounterMode("valueSettingStart");
    }
  };
  // * -----------------------------------------

  // Функция для установки максимального значения
  const addMaxNum = (num: number) => {
    setMaxNum(num);
  };

  // Функция для установки начального значения
  const addStartNum = (num: number) => {
    setStartNum(num);
  };

  // Функция для увеличения текущего значения на 1
  const incNumber = () => {
    setNumber((num) => num + 1);
  };

  // Функция для сброса текущего, максимального и начального значений и установки режима счетчика в "valueSettingStart"
  const resNumber = () => {
    localStorage.removeItem("counterMaxNum");
    localStorage.removeItem("counterStartNum");
    setNumber(0);
    setNumber(0);
    setMaxNum(0);
    setStartNum(0);
    setCounterMode("valueSettingStart");
  };

  // Функция для установки текущего значения равным начальному значению и установки режима счетчика в "valueIncrease"
  const setValueNumber = () => {
    setNumber(startNum);
    localStorage.setItem("counterMaxNum", JSON.stringify(maxNum));
    localStorage.setItem("counterStartNum", JSON.stringify(startNum));
    setCounterMode("valueIncrease");
  };

  // * -----------------------------------------

  // Стиль линии, которая меняет цвет в случае ошибки
  const styleLine = error ? `${styles.line} ${styles.red}` : styles.line;

  //* ------------------------------------------

  return (
    <div className={styles.App}>
      <div className={styles.setCounter}>
        {/* Компонент для установки значения счётчика */}
        <Count
          error={error}
          maxNum={maxNum}
          addMaxNum={addMaxNum}
          startNum={startNum}
          addStartNum={addStartNum}
          counterMode={counterMode}
        />
        <div className={styles.buttonApp}>
          {/* Кнопка для ввода установленного значения */}
          <Button
            callBack={setValueNumber}
            disabled={disabledButtonEnter}
            title="ВВОД"
          />
        </div>
      </div>

      <div className={styles.setCounter}>
        {/* Компонент для отображения значения счётчика */}
        <Scoreboard
          error={error}
          counterMode={counterMode}
          value={valueScoreboardNum}
        />
        {/* Линия, которая меняет цвет в случае ошибки */}
        <div className={styleLine}></div>

        <div className={styles.buttonApp}>
          {/* Кнопка для увеличения значения счётчика */}
          <Button
            callBack={incNumber}
            disabled={disabledButtonIncrement}
            title="ПРИБАВИТЬ"
          />
          {/* Кнопка для сброса значения счётчика */}
          <Button
            title="ОЧИСТИТЬ"
            callBack={resNumber}
            disabled={disabledButtonReset}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

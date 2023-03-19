import styles from "./countButton.module.css";

// Определение типа для свойств компонента кнопки ButtonProps.
// title - строковое значение, отображаемое на кнопке
// callBack - функция обратного вызова, которая будет выполнена при нажатии на кнопку
// disabled - булево значение, указывающее, должна ли быть кнопка отключена

type ButtonProps = {
  title: string;
  callBack: () => void;
  disabled: boolean;
};

const Button = (props: ButtonProps) => {
  const { title, callBack, disabled } = props;

  // Определение класса для кнопки в зависимости от атрибута disabled
  const classButton = disabled ? styles.buttonDisabled : styles.button;

  // Обработчик события при нажатии на кнопку
  const callBackHandler = () => {
    callBack();
  };

  return (
    <button
      disabled={disabled}
      onClick={callBackHandler}
      className={classButton}
    >
      {title}
    </button>
  );
};

export default Button;

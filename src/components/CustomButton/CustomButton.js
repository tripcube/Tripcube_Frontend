import { BaseButtonStyle } from './style';

export const ButtonSize = {
  NORMAL: 0,
  LARGE: 1,
};

export const ButtonTheme = {
  BLACK: 0,
  GRAY: 1,
  RED: 2,
  WHITE: 3,
};

Object.freeze(ButtonSize);
Object.freeze(ButtonTheme);

const CustomButton = ({
  buttonSize,
  buttonTheme,
  disabled,
  handler,
  children,
}) => {
  if (!buttonSize) {
    buttonSize = ButtonSize.NORMAL;
  }
  if (!buttonTheme) {
    buttonTheme = ButtonTheme.BLACK;
  }

  return (
    <BaseButtonStyle
      buttonSize={buttonSize}
      buttonTheme={buttonTheme}
      disabled={disabled}
      onClick={handler}
    >
      {children}
    </BaseButtonStyle>
  );
};

export default CustomButton;

import { ToastStyle } from "./style";

export const ToastTheme = {
  SUCCESS: 0,
  ERROR: 1,
};

Object.freeze(ToastTheme);

const Toast = ({ toastTheme, children }) => {
  if (!toastTheme) {
    toastTheme = ToastTheme.SUCCESS;
  }

  return (
    <ToastStyle toastTheme={toastTheme}>
      {toastTheme === ToastTheme.ERROR ? (
        <img src="images/icon_error.svg" alt="error_icon" />
      ) : (
        <img src="images/icon_check.svg" alt="check_icon" />
      )}
      {children}
    </ToastStyle>
  );
};

export default Toast;

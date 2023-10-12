import { ToastStyle } from './style';

export const ToastTheme = {
  SUCCESS: 0,
  ERROR: 1,
};

Object.freeze(ToastTheme);

const Toast = ({ toastTheme, children }) => {
  if (!toastTheme) {
    toastTheme = ToastTheme.SUCCESS;
  }

  return <ToastStyle toastTheme={toastTheme}>{children}</ToastStyle>;
};

export default Toast;

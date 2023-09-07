import styled from "styled-components";
import { ToastTheme } from "./Toast";

export const ToastStyle = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 16px;
  bottom: 60px;
  max-width: 344px;
  display: flex;
  align-items: center;
  background-color: ${props => (props.toastTheme == ToastTheme.SUCCESS) ? "#7BAB6E" : "#FF6B6B"};
  padding: 16px;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 16px;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  animation: toastAnimation 3s ease forwards;
  @keyframes toastAnimation {
    0% {opacity: 0;
      transform: translateY(20px);}
    50% {opacity: 1;
      transform: translateY(0);}
    100% {opacity: 0;
      transform: translateY(20px);}
  }
`;
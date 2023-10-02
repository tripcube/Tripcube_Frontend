import styled from 'styled-components';
import { ButtonSize, ButtonTheme } from './Button';

export const BaseButtonStyle = styled.button`
  transition: all 0.2s ease-in-out;
  width: ${(props) =>
    props.buttonSize == ButtonSize.NORMAL ? 'auto' : '100%'};
  height: ${(props) => (props.buttonSize == ButtonSize.NORMAL ? '28px' : '')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(props) =>
    props.buttonSize == ButtonSize.NORMAL ? '8px' : '20px 24px 20px 24px'};
  font-size: ${(props) =>
    props.buttonSize == ButtonSize.NORMAL ? '12px' : '16px'};
  border-radius: ${(props) =>
    props.buttonSize == ButtonSize.NORMAL ? '10px' : '0px'};
  background-color: ${(props) => {
    let backgroundColor;
    switch (props.buttonTheme) {
      case ButtonTheme.BLACK:
        backgroundColor = props.disabled ? '#eeeeee' : '#000000';
        break;
      case ButtonTheme.RED:
        backgroundColor = '#FF6B6B';
        break;
      case ButtonTheme.WHITE:
        backgroundColor = '#FFFFFF';
        break;
      default:
        backgroundColor = '#EEEEEE';
        break;
    }
    return backgroundColor;
  }};

  border: ${(props) =>
    props.buttonTheme == ButtonTheme.WHITE ? '1px solid #7BAB6E' : 'none'};
  color: ${(props) => {
    let color;
    switch (props.buttonTheme) {
      case ButtonTheme.BLACK:
        color = '#FFFFFF';
      case ButtonTheme.RED:
        color = '#FFFFFF';
        break;
      case ButtonTheme.WHITE:
        color = '#7BAB6E';
        break;
      default:
        color = '#A0A0A0';
        break;
    }
    return color;
  }};
  margin: ${(props) =>
    props.buttonTheme == ButtonTheme.WHITE ? '-1px' : '0px'};

  line-height: ${(props) =>
    props.buttonSize == ButtonSize.NORMAL ? '17px' : '16px'};
  font-weight: 500;
  cursor: pointer;

  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? 'brightness(1)' : 'brightness(0.9)'};
    scale: ${(props) => (props.disabled ? '1' : '0.98')};
  }
  white-space: nowrap;
`;

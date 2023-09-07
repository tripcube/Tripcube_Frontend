import { useState } from 'react';
import {
  DescriptionStyle,
  InputStyle,
  LabelStyle,
  WrapperStyle,
} from './style';

const Input = ({
  type,
  label,
  placeholder,
  description,
  isError,
  onChangeHandler,
  onFocusHandler,
  value,
}) => {
  if (!type) type = 'text';
  if (!label) label = '';
  if (!onFocusHandler) onFocusHandler = () => {};
  const [isFocused, setIsFocused] = useState(false);

  return (
    <WrapperStyle isFocused={isFocused} isError={isError}>
      <LabelStyle isFocused={isFocused || value} isError={isError}>
        {label}
      </LabelStyle>
      <InputStyle
        type={type}
        value={value}
        placeholder={isFocused ? placeholder : ''}
        isError={isError}
        onChange={onChangeHandler}
        onFocus={() => {
          setIsFocused(true);
          onFocusHandler();
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {description && (
        <DescriptionStyle isError={isError}>{description}</DescriptionStyle>
      )}
    </WrapperStyle>
  );
};

export default Input;

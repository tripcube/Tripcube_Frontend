import { useState } from 'react';
import {
  DescriptionStyle,
  InputStyle,
  WrapperStyle,
} from './styleSearch';

const InputSearch = ({
  type,
  placeholder,
  description,
  isError,
  onChangeHandler,
  onFocusHandler,
  value,
}) => {
  if (!type) type = 'text';
  if (!onFocusHandler) onFocusHandler = () => {};
  const [isFocused, setIsFocused] = useState(false);

  return (
    <WrapperStyle isFocused={isFocused} isError={isError}>
      <InputStyle
        type={type}
        value={value}
        placeholder={placeholder}
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

export default InputSearch;

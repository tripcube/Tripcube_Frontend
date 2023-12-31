import styled from 'styled-components';

export const WrapperStyle = styled.div`
  flex: 8;
  position: relative;
  border: ${(props) => (props.isFocused ? '1.5px' : '1.5px')} solid
    ${(props) => (props.isError ? '#333333' : '#333333')};
  border-radius: 10px;
  margin-right: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

export const InputStyle = styled.input`
  width: 100%;
  padding: 12.5px 14px;
  border: none;

  background: transparent;
  &:focus {
    outline: none;
  }
  font-size: 16px;
  color: ${(props) => (props.isError ? '#FF6B6B' : '#555555')};
`;

export const DescriptionStyle = styled.div`
  position: absolute;
  right: 12px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  color: ${(props) => (props.isError ? '#FF6B6B' : '#000000')};
`;

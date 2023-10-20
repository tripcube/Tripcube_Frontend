import styled from 'styled-components';

export const WrapperStyle = styled.div`
  position: relative;
  border: ${(props) => (props.isFocused ? '2px' : '0.5px')} solid
    ${(props) => (props.isError ? '#FF6B6B' : '#333333')};
  border-radius: 10px;
  margin: ${(props) => (props.isFocused ? '-1px' : '0px')};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border: 2px solid ${(props) => (props.isError ? '#FF6B6B' : '#000000')};
    margin: -1px;
  }
`;

export const LabelStyle = styled.span`
  position: absolute;
  top: ${(props) => (props.isFocused ? '0px' : '50%')};
  left: 9px;
  transform: translateY(-50%);

  font-size: ${(props) => (props.isFocused ? '12px' : '16px')};
  color: ${(props) => (props.isError ? '#FF6B6B' : '#000000')};
  padding: 0px 5px;
  z-index: ${(props) => (props.isFocused ? '0' : '-1')};

  background-color: ${(props) => (props.isFocused ? '#FFFFFFFF' : '#FFFFFF00')};
  transition: all 0.2s;
  border-radius: 8px;
`;

export const InputStyle = styled.input`
  width: 100%;
  padding: 14px 12px;
  border: none;

  background: transparent;
  &:focus {
    outline: none;
  }
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.isError ? '#FF6B6B' : '#555555')};
`;

export const DescriptionStyle = styled.div`
  position: absolute;
  right: 12px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  color: ${(props) => (props.isError ? '#FF6B6B' : '#000000')};
`;

import React from 'react';
import styled from 'styled-components';

const InputTitle = styled.div`
  color: #6a6a6a;
  font-weight: medium;
  font-size: 11px;
  margin-left: 4px;
  margin-bottom: 4px;
`;
const InputText = ({ label, type }) => {
  return (
    <>
      <InputTitle>{label}</InputTitle>
      <input type={type} />
    </>
  );
};

export default InputText;

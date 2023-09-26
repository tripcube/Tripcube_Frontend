import styled from 'styled-components';
import tags from '../../constants/tags';

const TagChip = ({ num }) => {
  return <TagChipStyle num={num}>{tags[num].name}</TagChipStyle>;
};

export default TagChip;

const TagChipStyle = styled.div`
  width: 40px;
  height: 24px;
  padding: 2px 4px 4px 2px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: ${(props) => tags[props.num].color};
`;

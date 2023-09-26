import styled from "styled-components";
import tags from "../../constants/tags";

const TagChip = ({ num }) => {
  return <TagChipStyle num={num}>{tags[num].name}</TagChipStyle>;
};

export default TagChip;

const TagChipStyle = styled.div`
  width: 40px;
  height: 24px;
  padding: 4px 8px 4px 8px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: ${(props) => tags[props.num].color};
`;

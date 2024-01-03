import styled from 'styled-components';
import tags from '../../constants/tags';

export const ChipSize = {
  SMALL: 0,
  NORMAL: 1,
};

const TagChip = ({ num, chipSize }) => {
  if (!chipSize) {
    chipSize = ChipSize.NORMAL;
  }

  return <TagChipStyle num={num}>{tags[num].name}</TagChipStyle>;
};

Object.freeze(ChipSize);

export default TagChip;

const TagChipStyle = styled.div`
  width: ${(props) => (props.chipSize === ChipSize.NORMAL ? '40px' : '24px')};
  height: ${(props) => (props.chipSize === ChipSize.NORMAL ? '24px' : '12px')};
  padding: 2px 4px;
  font-size: ${(props) =>
    props.chipSize === ChipSize.NORMAL ? '10px' : '8px'};
  font-weight: ${(props) =>
    props.chipSize === ChipSize.NORMAL ? '600' : '400'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${(props) => tags[props.num].color};
`;

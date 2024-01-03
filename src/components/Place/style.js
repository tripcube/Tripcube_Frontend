import styled from 'styled-components';

export const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Rank = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => {
    switch (props.rankIndex) {
      case 0:
        return '#d5a11e';
      case 1:
        return '#A3A3A3';
      case 2:
        return '#CD7F32';
      default:
        return 'transparent';
    }
  }};
`;

export const PlaceNameStyle = styled.div`
  font-size: 10px;
  font-weight: 600;
  padding: 4px 0px;
`;

export const TagListStyle = styled.div`
  display: flex;
  gap: 4px;
`;

export const NoTagStyle = styled.div`
  height: 12px;
  weight: 24px;
`;

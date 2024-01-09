import styled from 'styled-components';

export const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const PlaceImage = styled.img`
  width: ${(props) => (props.todo === 'none' ? '112px' : '180px')};
  height: ${(props) => (props.todo === 'none' ? '164px' : '90px')};
  border-radius: 8px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  object-fit: cover;
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

export const People = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 4px;
  display: flex;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  letter-spacing: -0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

export const PeopleImage = styled.img`
  width: 13px;
  height: 13px;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
`;

export const Todo = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  display: flex;
  color: #000;
  font-size: 10px;
  font-weight: 600;
  padding: 2px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color || '#000'};
`;

export const Accuracy = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 4px;
  display: flex;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  letter-spacing: -0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  background-color: #5e5e5e;
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

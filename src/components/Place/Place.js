import styled from 'styled-components';
import TagChip from '../TagChip/TagChip';

const Place = ({ place, onClick }) => {
  return (
    <div onClick={onClick}>
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '190px' }}
      >
        <PlaceImg
          src={place.placeImage}
          width='112px'
          height='164px'
          margin='4px'
        />
        <NameTextStyle>{place.placeName}</NameTextStyle>
        {place.tags && place.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
            }}
          >
            {place.tags.map((tag, index) => (
              <TagChip key={tag} num={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Place;

export const NameTextStyle = styled.div`
  font-size: 10px;
  font-weight: 600;
  padding: 4px 0px;
`;

const PlaceImg = styled.img`
  width: 108px;
  height: 164px;
`;

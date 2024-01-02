import styled from 'styled-components';
import TagChip from '../TagChip/TagChip';

const Place = ({ place, onClick }) => {
  return (
    <div onClick={onClick}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {place.placeImage === '' ? (
          <img
            src='images/null.svg'
            alt='image_null'
            width='112px'
            height='164px'
          />
        ) : (
          <img src={place.placeImage} width='112px' height='164px' />
        )}
        <div style={{ fontSize: '10px', fontWeight: 600, padding: '4px 0px' }}>
          {place.placeName}
        </div>
        {place.tags && place.tags.length > 0 ? (
          <div
            style={{
              display: 'flex',
              gap: '4px',
            }}
          >
            {place.tags.map((tag, index) => (
              <TagChip key={tag} num={tag} />
            ))}
          </div>
        ) : (
          <div style={{ height: '12px', weight: '24px' }} />
        )}
      </div>
    </div>
  );
};

export default Place;

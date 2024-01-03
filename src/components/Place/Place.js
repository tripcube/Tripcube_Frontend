import {
  PlaceWrapper,
  ImageWrapper,
  PlaceImage,
  Rank,
  PlaceNameStyle,
  TagListStyle,
  NoTagStyle,
} from './style';
import TagChip from '../TagChip/TagChip';

const Place = ({ place, onClick, rankIndex }) => {
  return (
    <div onClick={onClick}>
      <PlaceWrapper>
        {place.placeImage === '' ? (
          <PlaceImage src='images/null.svg' />
        ) : (
          <ImageWrapper>
            <PlaceImage src={place.placeImage} />
            {rankIndex === 0 || rankIndex === 1 || rankIndex === 2 ? (
              <Rank rankIndex={rankIndex}>{rankIndex + 1}</Rank>
            ) : null}
          </ImageWrapper>
        )}
        <PlaceNameStyle>{place.placeName}</PlaceNameStyle>
        {place.tags && place.tags.length > 0 ? (
          <TagListStyle>
            {place.tags.map((tag, index) => (
              <TagChip key={tag} num={tag} />
            ))}
          </TagListStyle>
        ) : (
          <NoTagStyle />
        )}
      </PlaceWrapper>
    </div>
  );
};

export default Place;

import {
  PlaceWrapper,
  ImageWrapper,
  PlaceImage,
  Rank,
  PeopleImage,
  People,
  PlaceNameStyle,
  TagListStyle,
  NoTagStyle,
} from './style';
import TagChip from '../TagChip/TagChip';

const Place = ({ place, onClick, rankIndex, todo, people }) => {
  const nullImageUrl =
    todo === 'none' ? '/images/null.svg' : '/images/null_todo.svg';

  console.log(todo);

  return (
    <div onClick={onClick}>
      <PlaceWrapper>
        {place.placeImage === '' ? (
          <PlaceImage src={nullImageUrl} todo={todo} />
        ) : (
          <ImageWrapper>
            <PlaceImage src={place.placeImage} todo={todo} />
            {rankIndex === 0 || rankIndex === 1 || rankIndex === 2 ? (
              <>
                <Rank rankIndex={rankIndex}>{rankIndex + 1}</Rank>
                <People rankIndex={rankIndex}>
                  <PeopleImage src='/images/people.svg' />
                  {people}
                </People>
              </>
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

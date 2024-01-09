import {
  PlaceWrapper,
  ImageWrapper,
  PlaceImage,
  Rank,
  PeopleImage,
  People,
  Todo,
  PlaceNameStyle,
  TagListStyle,
  NoTagStyle,
} from './style';
import TagChip from '../TagChip/TagChip';

const Place = ({ place, onClick, rankIndex, todo, people, tagColor }) => {
  const imageUrl =
    place.placeImage !== ''
      ? place.placeImage
      : todo === 'none'
      ? '/images/null.svg'
      : '/images/null_todo.svg';

  return (
    <div onClick={onClick}>
      <PlaceWrapper>
        <ImageWrapper>
          <PlaceImage src={imageUrl} todo={todo} />
          {rankIndex !== -1 &&
            (rankIndex === 0 || rankIndex === 1 || rankIndex === 2) && (
              <Rank rankIndex={rankIndex}>{rankIndex + 1}</Rank>
            )}
          {rankIndex !== -1 && (
            <People>
              <PeopleImage src='/images/people.svg' /> {people}
            </People>
          )}
          {todo !== 'none' && <Todo color={tagColor}># {todo}</Todo>}
        </ImageWrapper>
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

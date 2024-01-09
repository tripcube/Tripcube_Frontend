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
      ? place.placeImage // 첫 번째 조건: place.placeImage가 비어있지 않은 경우
      : todo === 'none'
      ? '/images/null.svg' // 두 번째 조건: place.placeImage가 비어있지만 todo가 'none'인 경우
      : '/images/null_todo.svg'; // 나머지 경우

  return (
    <div onClick={onClick}>
      <PlaceWrapper>
        <ImageWrapper>
          <PlaceImage src={imageUrl} todo={todo} />
          {rankIndex === 0 || rankIndex === 1 || rankIndex === 2 ? (
            <>
              <Rank rankIndex={rankIndex}>{rankIndex + 1}</Rank>
              <People rankIndex={rankIndex}>
                <PeopleImage src='/images/people.svg' />
                {people}
              </People>
            </>
          ) : null}
          {todo !== 'none' ? <Todo color={tagColor}># {todo}</Todo> : null}
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

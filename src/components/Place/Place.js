import styled from "styled-components";
import TagChip from "../TagChip/TagChip";

const Place = ({ place }) => {
  return (
    <div style={{ display: "flex" }}>
      <img src={place.placeImage} width="112px" height="164px" />
      <NameTextStyle>{place.placeName}</NameTextStyle>
      {place.tags && place.tags.length > 0 && (
        <div
          style={{
            display: "flex",
          }}
        >
          {place.tags.map((tag, index) => (
            <TagChip key={tag} num={tag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Place;

export const NameTextStyle = styled.div`
  font-size: 10px;
  font-weight: 600;
`;

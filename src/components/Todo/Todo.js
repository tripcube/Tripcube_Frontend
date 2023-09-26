import styled from "styled-components";
import tags from "../../constants/tags";
import serverapi from "../../api/serverapi";
import useAuthToken from "../../hooks/useAuthToken";

const Todo = ({ todoId, numTag, numLike, children, like }) => {
  const { getAccessToken } = useAuthToken();

  const love = async () => {
    const api = `todos/${todoId}/like`;

    try {
      const res = await serverapi.post(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        window.location.reload();
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const hate = async () => {
    const api = `todos/${todoId}/like`;

    try {
      const res = await serverapi.delete(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        window.location.reload();
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <TagBox num={numTag} />
        <TodoTextStyle>{children}</TodoTextStyle>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <LikeTextStyle>{numLike}</LikeTextStyle>

        {like ? (
          <img
            src="images/love_filled.svg"
            alt="love_filled"
            onClick={() => hate()}
          />
        ) : (
          <img
            src="images/love_empty.svg"
            alt="love_empty"
            onClick={() => love()}
          />
        )}
      </div>
    </div>
  );
};

export default Todo;

export const TagBox = styled.div`
  width: 8px;
  height: 28px;
  background-color: ${(props) => tags[props.num].color};
  margin-right: 12px;
`;

export const TodoTextStyle = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const LikeTextStyle = styled.div`
  font-size: 8px;
  font-weight: 500;
  font-color: #9f9f9f;
`;

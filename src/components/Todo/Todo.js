import styled from 'styled-components';
import tags from '../../constants/tags';
import serverapi from '../../api/serverapi';
import useAuthToken from '../../hooks/useAuthToken';
import { useState } from 'react';

const Todo = ({ todoId, numTag, numLike, children, like }) => {
  const { getAccessToken } = useAuthToken();
  const [Locallike, setLike] = useState(like);
  const [LocalNumLike, setNumLike] = useState(numLike);

  const love = async () => {
    console.log(todoId);
    const api = `todos/${todoId}/like`;

    try {
      const res = await serverapi.post(api, null, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        setLike(true);
        setNumLike(LocalNumLike + 1);
      }
    } catch (e) {
      console.log('error', e);
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
        setLike(false);
        setNumLike(LocalNumLike - 1);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '4px 12px 4px 12px',
        borderRadius: '5px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TagBox num={numTag} />
        <TodoTextStyle>{children}</TodoTextStyle>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LikeTextStyle>{LocalNumLike}</LikeTextStyle>

        {Locallike ? (
          <img
            src={require('../../images/heartFilled.svg').default}
            alt='heartFilled'
            onClick={() => hate()}
            style={{ marginLeft: '4px' }}
          />
        ) : (
          <img
            src={require('../../images/heartEmpty.svg').default}
            alt='heartEmpty'
            onClick={() => love()}
            style={{ marginLeft: '4px' }}
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

// BottomModalSheet.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './style.css';
import useAuthToken from '../../hooks/useAuthToken';
import serverapi from '../../api/serverapi';
import Todo from '../Todo/Todo';
import { useNavigate } from 'react-router-dom';

function BottomModalSheet({ onClose, location, getMarkerList }) {

  const [todolist, setTodolist] = useState([]);
  const { getAccessToken } = useAuthToken();
  const [isScrap, setScrap] = useState(false);
  const navigate = useNavigate();

  const getTodoInfo = async () => {
	if (location == null) {
		return ;
	}
	setScrap(location.scrap);
    const api = `todos/place?placeId=${location.placeId}&sort=LIKE_DESC&page=1&limit=3`;

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        }
      });
      console.log('res.data.data', res.data.data);
      if (res.status === 201) {
        const tmp = [...res.data.data];
        setTodolist(tmp);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const insertScrap = async () => {
    const api = `places/${location.placeId}/scrap`;
	setScrap(true);

    try {
      const res = await serverapi.post(api, null, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
		getMarkerList();
      }
    } catch (e) {
      console.log('error', e);
	  setScrap(false);
    }
  };

  const deleteScrap = async () => {
    const api = `places/${location.placeId}/scrap`;
	setScrap(false);

    try {
      const res = await serverapi.delete(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
		getMarkerList();
      }
    } catch (e) {
      console.log('error', e);
	  setScrap(true);
    }
  };

  useEffect(() => {
	getTodoInfo();
  }, [location]);

  if (location == null) {
	return;
  }

  return (
    <div className="modal-sheet">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
		<div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
			<div style={{display: "flex", justifyContent: "start"}}>
				<LeftButton>
					{isScrap ? (
						<img onClick={() => deleteScrap()} src={require("../../images/save_full.svg").default} style={{width: "24px", height: "24px", marginRight: "15px"}} />
					) : (
						<img onClick={() => insertScrap()} src={require("../../images/save.svg").default} style={{width: "24px", height: "24px", marginRight: "15px"}} />
					)}
				</LeftButton>
				<div onClick={() => {navigate(`/detail/${location.placeId}`)}}>
					<Title>{location.placeName}</Title> <br/>
					<Content>{location.address}</Content>
				</div>
			</div>
			<div>
				<img src={location.image} width="60px" height="60px" style={{borderRadius: "10%", boxShadow: "2px 2px 5px rgba(0,0,0,0.3)"}}></img>
			</div>
		</div>
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			{todolist.map((todo, index) => (
			<Todo
				key={index}
				todoId={todo.todoId}
				numTag={todo.tag}
				numLike={todo.likes}
				like={todo.like}
			>
				{todo.content}
			</Todo>
			))}
		</div>

      </div>
    </div>
  );
}

export default BottomModalSheet;

const LeftButton = styled.button`
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
`;

const Title = styled.span`
	font-size: 20px;
	font-weight: 500;
`;

const Content = styled.span`
	font-size: 11px;
	font-weight: 300;
	margin-top: 5px;
`;

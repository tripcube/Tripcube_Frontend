import React, { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import serverapi from "../api/serverapi";
import useAuthToken from "../hooks/useAuthToken";
import TopNav from "../components/TopNav/TopNav";
import areaCode1 from "../constants/areaCode1";
import areaCode2 from "../constants/areaCode2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Place from "../components/Place/Place";
import styled from "styled-components";
import tags from "../constants/tags";
import Toast, { ToastTheme } from "../components/Toast/Toast";

function UserRec(props) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const { getAccessToken } = useAuthToken();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const getList = async () => {
    const api = `places/recommend/like-place?page=${page}`;

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log("getList-page", page);
      if (res.status === 201) {
        if (res.data.data.length === 0 && list.length !== 0) {
          console.log("res.data.data.length", res.data.data.length);
          setToastMessage("더 이상 불러올 장소가 없습니다");
          setShowToast(true);
        }
        const tmp = [...list, ...res.data.data];
        setList(tmp);
        setPage(page + 1);
        console.log("list", list);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <TextStyle>
        <img src="images/flag.svg" alt="Popular" />
        회원님이 좋아할 장소
      </TextStyle>
      <PlaceStyle>
        {list.map((place, index) => (
          <Place
            key={place.placeId}
            place={place}
            onClick={() => navigate(`/detail/${place.placeId}`)}
          />
        ))}
        <Button
          buttonSize={ButtonSize.NORMAL}
          ButtonTheme={ButtonTheme.BLACK}
          handler={() => {
            getList();
          }}
        >
          장소 더 보기
        </Button>
      </PlaceStyle>
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
    </>
  );
}

function AreaRec(props) {
  const [poppage, setPoppage] = useState(1);
  const [poplist, setPoplist] = useState([]);
  const [goodpage, setGoodpage] = useState(1);
  const [goodlist, setGoodlist] = useState([]);
  const [area1, setArea1] = useState(1);
  const [area2, setArea2] = useState(1);
  const [tag, setTag] = useState(1);
  const { getAccessToken } = useAuthToken();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const getPop = async () => {
    const api = `places/recommend/hot-place?areaCode1=${area1}&areaCode2=${area2}&page=${poppage}`;

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        if (res.data.data.length === 0 && poplist.length !== 0) {
          console.log("res.data.data.length", res.data.data.length);
          setToastMessage("더 이상 불러올 장소가 없습니다");
          setShowToast(true);
        }
        const popTmp = [...poplist, ...res.data.data];
        setPoplist(popTmp);
        setPoppage(poppage + 1);
        console.log("poplist", poplist);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const getGood = async () => {
    const api = `places/recommend/todo-place?areaCode1=${area1}&areaCode2=${area2}&page=${goodpage}&tag=${tag}`;

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (res.status === 201) {
        if (res.data.data.length === 0 && goodlist.length !== 0) {
          console.log("res.data.data.length", res.data.data.length);
          setToastMessage("더 이상 불러올 장소가 없습니다");
          setShowToast(true);
        }
        const goodTmp = [...goodlist, ...res.data.data];
        setGoodlist(goodTmp);
        setGoodpage(goodpage + 1);
        console.log("goodlist", goodlist);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const areaReset = () => {
    setPoplist([]);
    setGoodlist([]);
    getPop();
    getGood();
  };

  const onChangeArea1 = (event) => {
    setArea1(event.target.value);
    areaReset();
  };

  const onChangeArea2 = (event) => {
    setArea2(event.target.value);
    areaReset();
  };

  const onChangeTag = (event) => {
    setTag(event.target.value);
    setGoodlist([]);
    getGood();
  };

  return (
    <div>
      <>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">도/시/구</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={area1}
            onChange={onChangeArea1}
            autoWidth
            label="도/시"
          >
            {areaCode1.map((area) => (
              <MenuItem key={area.num} value={area.num}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">시/구/군</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={area2}
            onChange={onChangeArea2}
            autoWidth
            label="시/구/군"
          >
            {areaCode2[area1].map((area) => (
              <MenuItem key={area.num} value={area.num}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
      <TextStyle>
        <img src="images/flag.svg" alt="Popular" />
        지난 24시간 인기 장소
      </TextStyle>
      <PlaceStyle>
        {poplist.length !== 0 ? (
          <>
            {poplist.map((place, index) => (
              <Place
                key={place.placeId}
                place={place}
                onClick={() => navigate(`/detail/${place.placeId}`)}
              />
            ))}
            <Button
              buttonSize={ButtonSize.NORMAL}
              ButtonTheme={ButtonTheme.BLACK}
              handler={() => {
                getPop();
              }}
            >
              장소 더 보기
            </Button>
          </>
        ) : (
          <a>불러올 장소가 없습니다</a>
        )}
      </PlaceStyle>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextStyle>
            <img src="images/flag.svg" alt="Popular" />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">활동 선택</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={tag}
                onChange={onChangeTag}
                autoWidth
                label="활동 선택"
              >
                {tags.map(
                  (tag) =>
                    tag.num !== 0 && (
                      <MenuItem key={tag.num} value={tag.num}>
                        {tag.explanation}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
            좋은 장소
          </TextStyle>
          <PlaceStyle>
            {goodlist.length !== 0 ? (
              <>
                {goodlist.map((place, index) => (
                  <Place
                    key={place.placeId}
                    place={place}
                    onClick={() => navigate(`/detail/${place.placeId}`)}
                  />
                ))}
                <Button
                  buttonSize={ButtonSize.NORMAL}
                  ButtonTheme={ButtonTheme.BLACK}
                  handler={() => {
                    getGood();
                  }}
                >
                  장소 더 보기
                </Button>
              </>
            ) : (
              <a>불러올 장소가 없습니다</a>
            )}
          </PlaceStyle>
        </div>
      </div>
      {showToast && (
        <Toast toastTheme={ToastTheme.SUCCESS}>{toastMessage}</Toast>
      )}
    </div>
  );
}

function Home() {
  return (
    <div>
      <TopNav>장소</TopNav>
      <div style={{ padding: "60px 12px 0px 12px" }}>
        <AreaRec />
        <UserRec />
      </div>
    </div>
  );
}

export default Home;

const TextStyle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0px 10px 0px;
  display: flex;
  align-items: center;
`;

const PlaceStyle = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  overflow-x: auto;
  height: auto;
  align-items: center;
`;

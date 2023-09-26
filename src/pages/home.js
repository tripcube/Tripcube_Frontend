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

function AreaRec(props) {
  const [poppage, setPoppage] = useState(1);
  const [poplist, setPoplist] = useState([]);
  const [goodpage, setGoodpage] = useState(1);
  const [goodlist, setGoodlist] = useState([]);
  const [area1, setArea1] = useState(1);
  const [area2, setArea2] = useState(1);
  const [tag, setTag] = useState(1);
  const { getAccessToken } = useAuthToken();

  const getPop = async () => {
    const api = `places/recommend/hot-place?areaCode1=${area1}&areaCode2=${area2}&page=${poppage}`;

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log("res.data.data", res.data.data);
      if (res.status === 201) {
        const popTmp = [...poplist, ...res.data.data];
        setPoplist(popTmp);
        setPoppage(poppage + 1);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const getGood = async () => {
    const api = `/recommend/todo-place?areaCode1=${area1}&areaCode2=${area2}&page=${goodpage}&tag=${tag}`;

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log("res.data.data", res.data.data);
      if (res.status === 201) {
        const goodTmp = [...goodlist, ...res.data.data];
        setGoodlist(goodTmp);
        setGoodpage(goodpage + 1);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getPop();
    getGood();
    console.log("area1", area1);
  }, [area1, area2]);

  useEffect(() => {
    getGood();
  }, [tag]);

  const onChangeArea1 = (event) => {
    setArea1(event.target.value);
  };

  return (
    <div style={{ paddingTop: "40px" }}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          시/도/구
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-small-label"
          id="demo-simple-select-small-autowidth"
          value={area1}
          onChange={onChangeArea1}
          autoWidth
          label="시/도/구"
        >
          {areaCode1.map((area) => (
            <MenuItem key={area.num} value={area.num}>
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextStyle>지난 24시간 인기 장소</TextStyle>
      <div>
        {poplist && poplist.length > 0 && (
          <div
            style={{
              display: "flex",
            }}
          >
            {poplist.map((place, index) => (
              <Place place={place} key={place.placeId} />
            ))}
          </div>
        )}
      </div>
      <TextStyle>지난 24시간 인기 장소</TextStyle>
      <div>
        {poplist && poplist.length > 0 && (
          <div
            style={{
              display: "flex",
            }}
          >
            {poplist.map((place, index) => (
              <Place place={place} key={place.placeId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <TopNav>장소</TopNav>
      <AreaRec />
    </div>
  );
}

export default Home;

import React, { useState } from 'react';
import useAuthToken from '../../hooks/useAuthToken';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import areaCode1 from '../../constants/areaCode1';
import areaCode2 from '../../constants/areaCode2';
import MenuItem from '@mui/material/MenuItem';
import PopularList from './PopularList';
import GoodList from './GoodList';
import { Select } from '@mui/material';

const AreaPart = ({ setToastMessage, setShowToast, navigate }) => {
  const [area1, setArea1] = useState(0);
  const [area2, setArea2] = useState(0);

  const { getAccessToken } = useAuthToken();

  const onChangeArea1 = (event) => {
    setArea1(event.target.value);
    if (event.target.value === 0) {
      setArea2(0);
    } else {
      setArea2(1);
    }
  };

  const onChangeArea2 = (event) => {
    setArea2(event.target.value);
  };

  return (
    <div>
      <>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>도/시/구</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={area1}
            onChange={onChangeArea1}
            autoWidth
            label='도/시'
          >
            {areaCode1.map((area) => (
              <MenuItem key={area.num} value={area.num}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small-label'>시/구/군</InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={area2}
            onChange={onChangeArea2}
            autoWidth
            label='시/구/군'
          >
            {areaCode2[area1].map((area) => (
              <MenuItem key={area.num} value={area.num}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>

      <PopularList
        area1={area1}
        area2={area2}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
        navigate={navigate}
        getAccessToken={getAccessToken}
      />

      <GoodList
        area1={area1}
        area2={area2}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
        navigate={navigate}
        getAccessToken={getAccessToken}
      />
    </div>
  );
};

export default AreaPart;

import React, { useEffect, useState } from 'react';

const Map = () => {
  const [info, setInfo] = useState('');

  function fromApptoWeb(msg) {
    document.querySelector('#flutterMessageTitle').InnerText = msg;
    setInfo(msg);
  }

  function fromWebToApp() {
    try {
      console.log('a');
      //eslint-disable-next-line
      GetLocation.postMessage('');
      console.log('b');
    } catch (e) {}
  }

  useEffect(() => {
    fromWebToApp();
  }, []);

  return (
    <div>
      <h1>{info}</h1>
      <div id='flutterMessageTitle' style={{ textAlign: 'center' }}></div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <button onClick={fromWebToApp}>fromWebToApp</button>
      </div>
    </div>
  );
};

export default Map;

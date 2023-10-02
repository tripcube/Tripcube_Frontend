import React, { useEffect, useState } from 'react';

const Map = () => {
  const [info, setInfo] = useState('');

  function fromApptoWeb(msg) {
    document.querySelector('#flutterMessageTitle').InnerText = msg;
    setInfo(msg);
  }

  function fromWebToApp() {
    try {
      //eslint-disable-next-line
      GetLocation.postMessage();
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
        <button onclick={() => fromWebToApp()}>fromWebToApp</button>
      </div>
    </div>
  );
};

export default Map;

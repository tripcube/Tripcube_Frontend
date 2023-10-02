import React, { useEffect } from 'react';

const Map = (props) => {
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
      <h1>{props.fromApptoWeb()}</h1>
      <div id='flutterMessageTitle' style={{ textAlign: 'center' }}></div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <button onClick={fromWebToApp}>fromWebToApp</button>
      </div>
    </div>
  );
};

export default Map;

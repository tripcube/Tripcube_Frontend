import React, { useEffect, useState } from 'react';

const Map = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function fromWebToApp() {
    try {
      console.log('a');
      //eslint-disable-next-line
      GetLocation.postMessage('');
      console.log('b');
    } catch (e) {
    } finally {
      setTimeout(function () {
        setX(localStorage.getItem('x', x));
        setY(localStorage.getItem('y', y));
      }, 3000);
    }
  }

  useEffect(() => {
    fromWebToApp();
  }, []);

  return (
    <div>
      <h1>
        {x}, {y}
      </h1>
      <div id='flutterMessageTitle' style={{ textAlign: 'center' }}></div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <button onClick={fromWebToApp}>fromWebToApp</button>
      </div>
    </div>
  );
};

export default Map;

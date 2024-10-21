import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import styles from './App.module.css';
import XRButton from './components/xr_button/XRButton';
import XRCanvas from './components/xr_canvas/XRCanvas';
import { useState } from 'react';

const store = createXRStore();

function App() {
  const readLocalStorageIp = () => {
    const localIp = localStorage.getItem('localIp');
    if (localIp) {
      const ipArray = localIp.split('.').map((ip) => Number(ip));
      return ipArray;
    }
    return [192, 168, 101, 52];
  };

  const readLocalStoragePort = () => {
    const localPort = localStorage.getItem('localPort');
    if (localPort) {
      return Number(localPort);
    }
    return 8787;
  };

  const [ips, setIps] = useState<number[]>(readLocalStorageIp());
  const [port, setPort] = useState<number>(readLocalStoragePort());

  const handleIpChange = (value: string, index: number) => {
    const newIp = Number(value);
    setIps((prevIps) => {
      const updatedIps = [...prevIps];
      updatedIps[index] = newIp;
      return updatedIps;
    });
  };

  return (
    <div className={styles.threeCanvas}>
      <p>hello!</p>
      <input
        name="local network ip"
        type="number"
        defaultValue={ips[0]}
        onChange={(event) => handleIpChange(event.target.value, 0)}
      ></input>
      <span>.</span>
      <input
        name="local network ip"
        type="number"
        defaultValue={ips[1]}
        onChange={(event) => handleIpChange(event.target.value, 1)}
      ></input>
      <span>.</span>
      <input
        name="local network ip"
        type="number"
        defaultValue={ips[2]}
        onChange={(event) => handleIpChange(event.target.value, 2)}
      ></input>
      <span>.</span>
      <input
        name="local network ip"
        type="number"
        defaultValue={ips[3]}
        onChange={(event) => handleIpChange(event.target.value, 3)}
      ></input>
      <span>:</span>
      <input
        name="local network port"
        type="number"
        defaultValue={port}
        onChange={(event) => setPort(Number(event.target.value))}
      ></input>
      <button
        onClick={() => {
          localStorage.setItem('localIp', ips.join('.'));
          localStorage.setItem('localPort', port.toString());
          alert('saved!');
        }}
      >
        submit
      </button>
      <XRButton store={store} />
      <Canvas>
        <XR store={store}>
          <XRCanvas url={`http://${ips.join('.')}:${port}`} />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

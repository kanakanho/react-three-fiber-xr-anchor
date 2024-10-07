import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import styles from './App.module.css';
import XRButton from './components/xr_button/XRButton';
import { CameraControls, Html } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import XRSpaceAnchor from './components/xr/XRSpaceAnchor';
import { Vector3 } from 'three';
import XRSpaceHtmlAnchor from './components/html/XRSpaceHtmlAnchor';

const store = createXRStore();

function App() {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const outPosition = useMemo(() => new Vector3(), []);
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    if (cameraControlRef.current) {
      cameraControlRef.current.getPosition(outPosition);
      setPositions((prevPositions) => [
        ...prevPositions,
        `${Date.now()},${outPosition.x},${outPosition.y},${outPosition.z}`,
      ]);
    }
  }, [cameraControlRef, outPosition]);

  const handleSave = () => {
    const csvContent = `time,x,y,z\n${positions
      .map((pos) => {
        const [unixTime, x, y, z] = pos.split(',');
        const date = new Date(parseInt(unixTime));
        const ymd = date.toLocaleDateString('ja-JP');
        const time = date.toLocaleTimeString('ja-JP', { hour12: false });
        return `${ymd} ${time},${x},${y},${z}`;
      })
      .join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'positions.csv';
    link.click();
  };

  return (
    <div className={styles.threeCanvas}>
      <p>hello!</p>
      <XRButton store={store} />
      <button onClick={handleSave}>保存</button>
      <Canvas>
        <XR store={store}>
          <Html>
            <p>{positions[positions.length - 1]}</p>
          </Html>
          <CameraControls ref={cameraControlRef} />
          <XRSpaceAnchor />
          <XRSpaceHtmlAnchor />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

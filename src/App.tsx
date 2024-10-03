import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import styles from './App.module.css';
import XRButton from './components/xr_button/XRButton';
import { CameraControls, Html } from '@react-three/drei';
import { useRef } from 'react';
import XRSpaceAnchor from './components/xr/XRSpaceAnchor';
import { Vector3 } from 'three';

const store = createXRStore();

function App() {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const outPosition = new Vector3();

  return (
    <div className={styles.threeCanvas}>
      <p>hello!</p>
      <XRButton store={store} />
      <Canvas>
        <XR store={store}>
          <Html>
            <p>{cameraControlRef.current?.getPosition(outPosition).toArray().toString()}</p>
          </Html>
          <CameraControls ref={cameraControlRef} />
          <XRSpaceAnchor />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

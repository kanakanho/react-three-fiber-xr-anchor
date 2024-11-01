import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import styles from './App.module.css';
import XRButton from './components/xr_button/XRButton';
import XRIndex from './components/xr_index/XRIndex';

const store = createXRStore({
  depthSensing: true,
  hand: {
    model: false,
  },
  controller: {
    model: false,
  },
  frameBufferScaling: 'high',
});

function App() {
  return (
    <div className={styles.threeCanvas}>
      <p>hello!</p>
      <XRButton store={store} />
      <Canvas>
        <XR store={store}>
          <XRIndex />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

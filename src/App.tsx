import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import styles from './App.module.css';
import XRButton from './components/xr_button/XRButton';
import XRSpaceAnchor from './components/xr/XRSpaceAnchor';

const store = createXRStore();

function App() {
  return (
    <div className={styles.threeCanvas}>
      <p>hello!</p>
      <XRButton store={store} />
      <Canvas>
        <XR store={store}>
          <XRSpaceAnchor />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

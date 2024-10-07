import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import styles from './App.module.css';
import XRButton from './components/xr_button/XRButton';
import XRCanvas from './components/xr_canvas/XRCanvas';

const store = createXRStore();

function App() {
  return (
    <div className={styles.threeCanvas}>
      <p>hello!</p>
      <XRButton store={store} />
      <Canvas>
        <XR store={store}>
          <XRCanvas />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import styles from './App.module.css';
import XRButton from './components/xr_button/XRButton';
import XRCanvas from './components/xr_canvas/XRCanvas';

const store = createXRStore();

function App() {
  const url = import.meta.env.VITE_WEBSOCKET_CONSOLE_URL as string;
  return (
    <div className={styles.threeCanvas}>
      <p>hello!</p>
      <XRButton store={store} />
      <Canvas>
        <XR store={store}>
          <XRCanvas url={url} />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

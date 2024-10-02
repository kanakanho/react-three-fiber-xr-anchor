import { XRStore } from '@react-three/xr';
import styles from './XRButton.module.css';

type Props = {
  store: XRStore;
};

const XRButton = ({ store }: Props) =>  {
  return (
    <div className={styles.xrButtonContainer}>
      <button className={styles.xrButton} onClick={() => store.enterAR()}>
        Enter AR
      </button>
    </div>
  );
}

export default XRButton;

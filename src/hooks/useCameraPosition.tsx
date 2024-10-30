import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Quaternion, Vector3 } from 'three';

const vectorHelper = new Vector3();
const quaternionHelper = new Quaternion();

type TimeAndWorldPosition= {
  t: number;
  x: number;
  y: number;
  z: number;
};

type TimeAndWorldQuaternion = {
  t: number;
  x: number;
  y: number;
  z: number;
  w: number;
};

const useCameraPosition = () => {
  const camera = useThree((state) => state.camera);
  const positionRef = useRef<TimeAndWorldPosition[]>([]);
  const quaternionRef = useRef<TimeAndWorldQuaternion[]>([]);
  useFrame(() => {
    camera.getWorldPosition(vectorHelper);
    camera.getWorldQuaternion(quaternionHelper);
    positionRef.current.push({ t: new Date().getTime()/1000, x: vectorHelper.x, y: vectorHelper.y, z: vectorHelper.z });
    quaternionRef.current.push({ t: new Date().getTime()/1000, x: quaternionHelper.x, y: quaternionHelper.y, z: quaternionHelper.z, w: quaternionHelper.w });
  });

  return [positionRef.current, quaternionRef.current] as const;
};

export default useCameraPosition;

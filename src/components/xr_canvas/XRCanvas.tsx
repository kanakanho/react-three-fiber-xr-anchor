import { CameraControls, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import PostMinio from '@/util/PostMinio';
import XRSpaceHand from '../xr_space_hand/XRSpaceHand';

const XRCanvas = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const outPosition = new Vector3(0, 0, 0);
  const [positions, setPositions] = useState<string[]>([]);

  const handleSave = () => {
    const csvContent = `time,x,y,z\n${positions
      .map((pos) => {
        const [unixTime, x, y, z] = pos.split(',');
        const date = new Date(parseInt(unixTime));
        const ymd = date.toLocaleDateString('ja-JP');
        const time = date.toLocaleTimeString('ja-JP', { hour12: false });
        const m_sec = date.getMilliseconds();
        return `${ymd} ${time} ${m_sec},${x},${y},${z}`;
      })
      .join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'camera-positions.csv';
    link.click();

    PostMinio(blob);
  };

  useFrame(() => {
    if (cameraControlRef.current) {
      cameraControlRef.current.getPosition(outPosition);
      setPositions((prevPositions) => [
        ...prevPositions,
        `${Date.now()},${outPosition.x},${outPosition.y},${outPosition.z}`,
      ]);
    }
  });

  const [handPosition, setHandPosition] = useState<Vector3>(new Vector3(0, 0, 0));

  return (
    <>
      <Html>
        <button onClick={handleSave}>カメラの位置を保存</button>
        <p>{positions[positions.length - 1]}</p>
        <p>{handPosition}</p>
      </Html>
      <CameraControls ref={cameraControlRef} />
      <XRSpaceHand setHandPosition={setHandPosition} />
    </>
  );
};

export default XRCanvas;

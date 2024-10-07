import { CameraControls, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import XRSpaceHtmlAnchor from '../html/XRSpaceHtmlAnchor';
import XRSpaceAnchor from '../xr/XRSpaceAnchor';

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
        return `${ymd} ${time},${x},${y},${z}`;
      })
      .join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'positions.csv';
    link.click();
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

  return (
    <>
      <Html>
        <button onClick={handleSave}>保存</button>
        <p>{positions[positions.length - 1]}</p>
      </Html>
      <CameraControls ref={cameraControlRef} />
      <XRSpaceAnchor />
      <XRSpaceHtmlAnchor />
    </>
  );
};

export default XRCanvas;
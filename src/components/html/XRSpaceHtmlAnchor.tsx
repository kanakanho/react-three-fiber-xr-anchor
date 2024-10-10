import PostMinio from '@/util/PostMinio';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useXRAnchor, useXRInputSourceEvent, useXRInputSourceState, XRSpace } from '@react-three/xr';
import { useState } from 'react';
import { Quaternion, Vector3 } from 'three';

const XRSpaceHtmlAnchor = () => {
  const [anchor, requestAnchor] = useXRAnchor();

  const handState = useXRInputSourceState('hand', 'right');
  const inputSource = handState?.inputSource;
  useXRInputSourceEvent(
    inputSource,
    'select',
    async () => {
      if (inputSource == null) {
        return;
      }
      requestAnchor({
        relativeTo: 'world',
        worldPosition: new Vector3(0, 1, 0),
        worldQuaternion: new Quaternion(0, 0, 0, 0),
      });
    },
    [requestAnchor, inputSource],
  );

  if (anchor == null) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    link.download = 'hand-positions.csv';
    link.click();

    PostMinio(blob);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useFrame(() => {
    if (handState?.object) {
      setPositions((prevPositions) => [
        ...prevPositions,
        `${Date.now()},${handState?.object?.position.x},${handState?.object?.position.y},${handState?.object?.position.z}`,
      ]);
    }
  });

  return (
    <XRSpace space={anchor.anchorSpace}>
      <Html>
        <p>hello</p>
        <p>{handState?.object?.position}</p>
        <button onClick={handleSave}>手の位置を保存</button>
      </Html>
    </XRSpace>
  );
};

export default XRSpaceHtmlAnchor;

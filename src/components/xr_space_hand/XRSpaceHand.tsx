import useWebSocket from '@/hooks/useWebSocket';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useXRAnchor, useXRInputSourceEvent, useXRInputSourceState, XRSpace } from '@react-three/xr';
import React, { useEffect, useState } from 'react';
import { Quaternion, Vector3 } from 'three';

type Props = {
  url: string;
  setHandPosition: React.Dispatch<React.SetStateAction<Vector3>>;
};

const XRSpaceHand = ({ url, setHandPosition }: Props) => {
  const { isOpened, socketRef } = useWebSocket(`${url}/api/ws`);

  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (positions.length > 0 && isOpened) {
        socketRef.current?.send(positions.join(';'));
        setPositions([]);
      }
    }, 60000); // 1分ごとに送信

    return () => clearInterval(interval);
  }, [positions, isOpened, socketRef]);

  useFrame(() => {
    if (isOpened) {
      const position = handState?.object?.getWorldPosition(outHandPosition).toArray().join(',') ?? '';
      setPositions((prevPositions) => [...prevPositions, position]);
    }
  });

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

  const outHandPosition = new Vector3(0, 0, 0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useFrame(() => {
    setHandPosition(handState?.object?.getWorldPosition(outHandPosition) ?? new Vector3(0, 0, 0));
  });

  return (
    <XRSpace space={anchor.anchorSpace}>
      <group>
        <Text position={new Vector3(1, 1, 1)} fontSize={1} color="white">
          {handState?.object?.getWorldPosition(outHandPosition).toArray().join(',')}
        </Text>
      </group>
      <mesh pointerEventsType={{ deny: 'grab' }} position={[0, 0, 0]}>
        <boxGeometry />
      </mesh>
    </XRSpace>
  );
};

export default XRSpaceHand;

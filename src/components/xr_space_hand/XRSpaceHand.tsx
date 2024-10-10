import { useFrame } from '@react-three/fiber';
import { useXRAnchor, useXRInputSourceEvent, useXRInputSourceState, XRSpace } from '@react-three/xr';
import React from 'react';
import { Quaternion, Vector3 } from 'three';

type Props = {
  setHandPosition: React.Dispatch<React.SetStateAction<Vector3>>;
};

const XRSpaceHand = ({ setHandPosition }: Props) => {
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

  return <XRSpace space={anchor.anchorSpace} />;
};

export default XRSpaceHand;

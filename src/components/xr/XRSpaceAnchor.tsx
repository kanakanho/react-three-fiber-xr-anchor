import { useXRAnchor, useXRInputSourceEvent, useXRInputSourceState, XRSpace } from '@react-three/xr';
import { Quaternion, Vector3 } from 'three';

const XRSpaceAnchor = () => {
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
        worldPosition: new Vector3(0, 0, 0),
        worldQuaternion: new Quaternion(0, 0, 0, 0),
      });
    },
    [requestAnchor, inputSource],
  );

  if (anchor == null) {
    return null;
  }

  return (
    <XRSpace space={anchor.anchorSpace}>
      <mesh pointerEventsType={{ deny: 'grab' }} position={[0, 0, 0]}>
        <boxGeometry />
      </mesh>
    </XRSpace>
  );
};

export default XRSpaceAnchor;

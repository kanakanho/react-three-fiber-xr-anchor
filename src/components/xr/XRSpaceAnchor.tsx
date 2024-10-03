import { useXRAnchor, useXRInputSourceEvent, useXRInputSourceState, XRSpace } from '@react-three/xr';
import { Quaternion, Vector3 } from 'three';

type Props = {
  position: Vector3;
};

const XRSpaceAnchor = ({ position }: Props) => {
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
      requestAnchor({ relativeTo: 'world', worldPosition: position, worldQuaternion: new Quaternion(0, 0, 0, 0) });
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

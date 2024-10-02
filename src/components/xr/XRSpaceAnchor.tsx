import { useXRAnchor, useXRInputSourceEvent, useXRInputSourceState, XRSpace } from '@react-three/xr';

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
      requestAnchor({ relativeTo: 'world', worldPosition: [0, 0, 0], worldQuaternion: [0, 0, 0, 0] });
    },
    [requestAnchor, inputSource],
  );

  if (anchor == null) {
    return null;
  }

  return (
    <XRSpace space={anchor.anchorSpace}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <mesh pointerEventsType={{ deny: 'grab' }} position={[0, 1, -1]}>
        <boxGeometry />
      </mesh>
    </XRSpace>
  );
};

export default XRSpaceAnchor;

import { Html } from '@react-three/drei';
import { useXRAnchor, useXRInputSourceEvent, useXRInputSourceState, XRSpace } from '@react-three/xr';
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

  return (
    <XRSpace space={anchor.anchorSpace}>
      <Html>
        <p>hello</p>
      </Html>
    </XRSpace>
  );
};

export default XRSpaceHtmlAnchor;

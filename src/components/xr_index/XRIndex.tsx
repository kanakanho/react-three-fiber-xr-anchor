import useCameraPosition from '@/hooks/useCameraPosition';
import PostMinio from '@/util/PostMinio';

const XRIndex = () => {
  const [positionRef, quaternionRef] = useCameraPosition();

  const handleSave = () => {
    const blobContent = new Blob([JSON.stringify(positionRef) + '\n' + JSON.stringify(quaternionRef)], {
      type: 'text/json',
    });
    PostMinio(blobContent);
  };

  return (
    // eslint-disable-next-line react/no-unknown-property
    <mesh pointerEventsType={{ deny: 'grab' }} onClick={handleSave} position={[0, 1, 0]}>
      <boxGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default XRIndex;

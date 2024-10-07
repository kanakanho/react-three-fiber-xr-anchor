const PostMinio = async (data: Blob) => {
  const minioUrl = import.meta.env.VITE_MINIO_URL;
  const minioBucket = import.meta.env.VITE_MINIO_BUCKET;
  const minioPath = import.meta.env.VITE_MINIO_PATH;

  const minio_username = import.meta.env.VITE_MINIO_USERNAME;
  const minio_password = import.meta.env.VITE_MINIO_PASSWORD;

  if (!minioUrl || !minioBucket || !minioPath || !minio_username || !minio_password) {
    throw new Error('Minio configuration is missing');
  }

  const url = `${minioUrl}/api/object/upload`;

  const formData = new FormData();
  formData.append('bucket', minioBucket);
  formData.append('path', minioPath);

  const date = new Date();
  const ymd = date.toLocaleDateString('ja-JP');
  const time = date.toLocaleTimeString('ja-JP', { hour12: false });

  formData.append('file', data, `positions_${ymd}_${time}.csv`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${minio_username}:${minio_password}`)}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const responseText = await response.text();
    alert(responseText);
    throw new Error('Failed to upload to Minio');
  }

  alert('Uploaded to Minio');
  return;
};

export default PostMinio;

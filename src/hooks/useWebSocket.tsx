import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
  const [isOpened, setIsOpened] = useState(false);
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    // 接続したかどうかを確認
    ws.onopen = () => {
      setIsOpened(true);
    };

    const onClose = () => {
      const ws = new WebSocket(url);
      socketRef.current = ws;
      console.log('Reconnecting to server...');
    };
    ws.addEventListener('close', onClose);

    return () => {
      ws.close();
    };
  }, [url]);

  return { isOpened, socketRef };
};

export default useWebSocket;

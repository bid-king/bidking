import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { live } from '../../api/live';
import { store } from '../../store/store';

export function useSocket(roomId: number, nickname: string) {
  const socket = useRef<Socket | null>(null);
  const API = useRef({});
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);

  useEffect(() => {
    socket.current = io('http://localhost:8005', {
      withCredentials: true,
    });
    const SOCKET_API = live(socket.current);
    API.current = SOCKET_API;
    SOCKET_API.req.connect(roomId, nickname);
    SOCKET_API.res.chat();
    SOCKET_API.res.notice();
    SOCKET_API.res.start();
    SOCKET_API.res.next();
    SOCKET_API.res.failBid();
    SOCKET_API.res.successBid();
    SOCKET_API.res.updateBid();

    return () => {
      SOCKET_API.req.leave(roomId, nickname);
    }; //unmount시 채팅방 나갑니다
  }, [roomId, nickname]);
  return { SOCKET: socket.current, API, error: socketConnectionErr };
}

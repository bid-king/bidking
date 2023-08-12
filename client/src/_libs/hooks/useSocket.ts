import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { live, SocketAPI } from '../../api/live';
import { store } from '../../store/store';

export function useSocket(roomId: number, nickname: string) {
  const socket = useRef<Socket | null>(null);
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);

  useEffect(() => {
    socket.current = io('http://localhost:8005', {
      withCredentials: true,
    });

    const SOCKET_API = live(socket.current);
    SOCKET_API.send.connect(roomId, nickname);

    return () => {
      SOCKET_API.send.leave(roomId, nickname);
    }; //unmount시 채팅방 나갑니다
  }, [roomId, nickname]);

  return { SOCKET: socket, error: socketConnectionErr };
}

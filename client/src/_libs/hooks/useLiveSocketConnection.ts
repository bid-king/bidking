import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { live } from '../../api/live';
import { store } from '../../store/store';

export function useLiveSocketConnection(roomId: number) {
  const socket = useRef<Socket | null>(null);
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);
  const [userNickname, setUserNickname] = useState<string>('');
  useEffect(() => {
    socketConfig(roomId);

    async function socketConfig(roomId: number) {
      try {
        socket.current = await io('http://localhost:8005', {
          withCredentials: true,
        });
        const socketApi = live(socket.current);
        socketApi.req.connect(roomId, '정예지짱');
      } catch (err) {
        setSocketConnectionErr(err);
      }
    }

    return () => {}; //unmount시 채팅방 나가야함
  }, [roomId]);
  return { socket: socket.current, socketConnectionErr };
}

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import live from '../../api/live';
import { store } from '../../store/store';

export function useLiveSocketConnection(roomId: number) {
  const socket = useRef(live);
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);
  const [userNickname, setUserNickname] = useState<string>('');
  useEffect(() => {
    auth();

    async function auth() {
      try {
        // setUserNickname(store.getState().user.nickname);
        // if (!userNickname) throw new Error('403');
        // else {
        socket.current.req.connect(roomId, userNickname);
        console.log(socket.current.ws);

        console.log('우와 연결이 되었어요');
        // }
      } catch (err) {
        setSocketConnectionErr(err);
      }
    }

    return () => {
      live.req.leave(roomId, userNickname);
    }; //unmount시 채팅방 나가야함
  }, []);
  return { socket: socket.current, socketConnectionErr };
}

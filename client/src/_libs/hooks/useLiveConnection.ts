import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { enter, live } from '../../api/live';
import { useAppSelector } from '../../store/hooks';
import { store } from '../../store/store';

export function useLiveConnection() {
  const [userId, setUserId] = useState<number>(0);
  const [auctionRoomId, setAuctionRoomId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [auctionRoomType, setAuctionRoomType] = useState<'common' | 'reverse'>('common');
  const [liveAuthErr, setLiveAuthErr] = useState<unknown>(null);
  const [seller, setSeller] = useState<boolean>(false);
  const { accessToken } = useAppSelector(state => state.user);
  const { auctionId } = useParams<string>();
  const socket = useRef<Socket | null>(null);
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);

  useEffect(() => {
    getRoomInfo();

    socket.current?.on('roomClosed', () => {
      socket.current?.emit('roomClosed', { roomId: auctionRoomId });
    });

    async function getRoomInfo() {
      const uid = (await store.getState().user.id) || 0;
      enter(Number(auctionId), accessToken)
        .then(data => {
          setUserId(uid);
          setAuctionRoomId(data.auctionRoomId);
          setNickname(data.nickname);
          setSeller(data.seller);
          setTitle(data.title);
          setAuctionRoomType(data.auctionRoomType);
          return data;
        })
        .then(res => {
          socket.current = io('http://localhost:8005', {
            withCredentials: true,
          });
          live(socket.current).send.connect(res.auctionRoomId, res.nickname, res.seller);
        })
        .catch(err => setLiveAuthErr(err));
    }

    return () => {
      live(socket.current).send.leave(auctionRoomId);
    }; //unmount시 채팅방 나갑니다
  }, [auctionId]);

  return {
    userId,
    auctionRoomId,
    auctionRoomType,
    nickname,
    title,
    liveAuthErr,
    seller,
    SOCKET: socket,
    error: socketConnectionErr,
  };
}

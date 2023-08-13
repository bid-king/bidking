import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { enter, live } from '../../api/live';
import { useAppSelector } from '../../store/hooks';
import { store } from '../../store/store';

export function useLiveEnter() {
  const [userId, setUserId] = useState<number>(0);
  const [auctionRoomId, setAuctionRoomId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [auctionRoomType, setAuctionRoomType] = useState<'common' | 'reverse'>('common');
  const [liveAuthErr, setLiveAuthErr] = useState<unknown>(null);
  const [seller, setSeller] = useState<boolean>(false);
  const { accessToken } = useAppSelector(state => state.user);
  const auctionId = useParams<string>();
  const socket = useRef<Socket | null>(null);
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);

  useEffect(() => {
    try {
      (async () => {
        const isLogined = await store.getState().user.isLogined;
        if (!isLogined) return;
        else {
          const uid = (await store.getState().user.id) || 0;
          const data = await enter(Number(auctionId), accessToken);
          setUserId(uid);
          setAuctionRoomId(data.auctionRoomId);
          setNickname(data.nickname);
          setSeller(data.seller);
          setTitle(data.title);
          setAuctionRoomType(data.auctionRoomType);
        }
      })();
    } catch (err) {
      setLiveAuthErr(err);
    }
  }, [auctionId]);

  useEffect(() => {
    socket.current = io('http://localhost:8005', {
      withCredentials: true,
    });

    const SOCKET_API = live(socket.current);
    SOCKET_API.send.connect(auctionRoomId, nickname, seller);

    return () => {
      SOCKET_API.send.leave(auctionRoomId, nickname);
    }; //unmount시 채팅방 나갑니다
  }, [auctionId, nickname]);

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

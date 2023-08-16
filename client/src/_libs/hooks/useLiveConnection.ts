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
  const [sellerNickname, setSellerNickname] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [auctionRoomType, setAuctionRoomType] = useState<'COMMON' | 'REVERSE'>('COMMON');
  const [liveAuthErr, setLiveAuthErr] = useState<unknown>(null);
  const [seller, setSeller] = useState<boolean>(false);
  const { accessToken } = useAppSelector(state => state.user);
  const { auctionId } = useParams<string>();
  const socket = useRef<Socket | null>(null);
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);

  useEffect(() => {
    getRoomInfo();

    async function getRoomInfo() {
      const uid = (await store.getState().user.id) || 0;
      enter(Number(auctionId), accessToken)
        .then(data => {
          setUserId(uid);
          setAuctionRoomId(data.auctionRoomId);
          setNickname(data.nickname);
          setSellerNickname(data.sellerNickname);
          setSeller(data.seller);
          setTitle(data.title);
          setAuctionRoomType(data.auctionRoomType);
          return data;
        })
        .then(res => {
          const ROOT = process.env.REACT_APP_WS_ROOT as string;
          socket.current = io(ROOT, {
            withCredentials: true,
            transports: ['websocket'],
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
    sellerNickname,
    title,
    liveAuthErr,
    seller,
    SOCKET: socket,
    error: socketConnectionErr,
  };
}
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { enter } from '../../api/live';
import { useAppSelector } from '../../store/hooks';
import { store } from '../../store/store';

export function useLiveEnter() {
  const [userId, setUserId] = useState<number>(0);
  const [auctionRoomId, setAuctionRoomId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [auctionRoomType, setAuctionRoomType] = useState<'COMMON' | 'REVERSE'>('COMMON');
  const [liveAuthErr, setLiveAuthErr] = useState<unknown>(null);
  const { accessToken } = useAppSelector(state => state.user);
  const auctionId = useParams<string>();

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
          setTitle(data.title);
          setAuctionRoomType(data.auctionRoomType);
        }
      })();
    } catch (err) {
      setLiveAuthErr(err);
    }
  }, [auctionId]);

  return { userId, auctionRoomId, auctionRoomType, nickname, title, liveAuthErr };
}

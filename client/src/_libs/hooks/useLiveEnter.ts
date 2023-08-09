import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { live } from '../../api/live';
import { store } from '../../store/store';

export function useLiveEnter() {
  // const [userId, setUserId] = useState<number>(0);
  // const [auctionRoomId, setAuctionRoomId] = useState<number>(0);
  // const [nickname, setNickname] = useState<string>('');
  // const [title, setTitle] = useState<string>('');
  // const [auctionRoomType, setAuctionRoomType] = useState<string>('');
  // const [liveAuthErr, setLiveAuthErr] = useState<unknown>(null);
  // useEffect(() => {
  //   try {
  //     const auctionId = useParams<string>();
  //     (async () => {
  //       const isLogined = await store.getState().user.isLogined;
  //       if (!isLogined) throw new Error('403');
  //       else {
  //         const uid = (await store.getState().user.id) || 0;
  //         const data = await live.enter(Number(auctionId));
  //         setUserId(uid);
  //         setAuctionRoomId(data.auctionRoomId);
  //         setNickname(data.nickname);
  //         setTitle(data.title);
  //         setAuctionRoomType(data.auctionRoomType);
  //       }
  //     })();
  //   } catch (err) {
  //     setLiveAuthErr(err);
  //   }
  // });
  // return { userId, auctionRoomId, auctionRoomType, nickname, title, liveAuthErr };
}

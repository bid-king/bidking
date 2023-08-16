import { Publisher } from 'openvidu-browser';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { enter, live } from '../../api/live';
import { useAppSelector } from '../../store/hooks';
import { store } from '../../store/store';
import { StreamData, useSellerOV, useOrderOV } from './useOvConnect';

export function useLiveConnection() {
  //API CALL DATA
  const [auctionRoomId, setAuctionRoomId] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [sellerNickname, setSellerNickname] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [auctionRoomType, setAuctionRoomType] = useState<'COMMON' | 'REVERSE'>('COMMON');
  const [liveAuthErr, setLiveAuthErr] = useState<unknown>(null);
  const [seller, setSeller] = useState<boolean>(false);
  //login User Data
  const { accessToken } = useAppSelector(state => state.user);
  const { auctionId } = useParams<string>();
  const [userId, setUserId] = useState<number | null>(null);
  //socket
  const socket = useRef<Socket | null>(null);
  const [socketConnectionErr, setSocketConnectionErr] = useState<unknown>(null);
  //openvidu
  const [publisher, setPublisher] = useState<Publisher | null>();
  let cameraToggle: (arg: boolean) => void;
  let micToggle: (arg: boolean) => void;
  let leaveOpenvidu: () => void;

  cameraToggle = function (arg) {};
  micToggle = function (arg) {};
  leaveOpenvidu = function () {};

  const [streamList, setStreamList] = useState<StreamData[] | null>(null);
  //구현부
  useEffect(() => {
    getRoomInfo();

    async function getRoomInfo() {
      const uid = (await store.getState().user.id) || null;
      enter(Number(auctionId), accessToken)
        .then(data => {
          setUserId(uid);
          setAuctionRoomId(data.auctionRoomId);
          setNickname(data.nickname);
          setSellerNickname(data.sellerNickname);
          setSeller(data.seller);
          setTitle(data.title);
          setAuctionRoomType(data.auctionRoomType);
          return data; //API 데이터 그대로 toss
        })
        .then(data => {
          //소켓 연결 요청
          const ROOT = process.env.REACT_APP_WS_ROOT as string;
          socket.current = io(ROOT, {
            withCredentials: true,
            transports: ['websocket'],
          });
          live(socket.current).send.connect(data.auctionRoomId, data.nickname, data.seller);
          return data; //이전에 받은 API 데이터 그대로 toss
        })
        .then(data => {
          if (seller) {
            //판매자와 구매자에 따라 각각의 useOpenvidu Hook 실행
            const { publisher, onChangeCameraStatus, onChangeMicStatus, leaveSession } = useSellerOV(
              uid,
              data.auctionRoomId
            );
            setPublisher(publisher);
            cameraToggle = onChangeCameraStatus;
            micToggle = onChangeMicStatus;
            leaveOpenvidu = leaveSession;
          } else {
            const { streamList } = useOrderOV(uid, data.auctionRoomId);
            setStreamList(streamList);
          }
        })
        .catch(err => setLiveAuthErr(err));
    }

    return () => {
      live(socket.current).send.leave(Number(auctionId));
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
    publisher,
    cameraToggle,
    micToggle,
    leaveOpenvidu,
    streamList,
  };
}

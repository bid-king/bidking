import { OpenVidu, Publisher, StreamManager, Session } from 'openvidu-browser';
import { getToken } from '../../api/openvidu';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type StreamData = {
  streamManager: StreamManager;
  userId: number;
};

export function useOrderOV(userId: number, auctionRoomId: number) {
  const [subscribers, setSubscribers] = useState<StreamData[]>([]);
  const [session, setSession] = useState<Session | null>();
  const streamList = useMemo(() => subscribers, [subscribers]);
  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setSubscribers([]);
  }, [session]);

  useEffect(() => {
    if (userId && auctionRoomId) {
      const openVidu = new OpenVidu();
      const session = openVidu.initSession();
      console.log('구매자 오픈비두 연결 요청');
      session.on('streamCreated', event => {
        const subscriber = session.subscribe(event.stream, '');
        const data = JSON.parse(event.stream.connection.data);
        setSubscribers(prev => {
          return [
            ...prev.filter(it => it.userId !== +data.userId),
            { streamManager: subscriber, userId: +data.userId },
          ];
        });
      });

      session.on('streamDestroyed', event => {
        event.preventDefault();
        const data = JSON.parse(event.stream.connection.data);
        setSubscribers(prev => prev.filter(it => it.userId !== +data.userId));
      });

      session.on('exception', exception => {
        console.warn(exception);
      });

      getToken(String(auctionRoomId)).then(token => {
        session!.connect(token, JSON.stringify({ userId })).catch(error => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
      });

      setSession(session);
      return leaveSession;
    }
  }, [auctionRoomId, userId]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => leaveSession());
    return () => {
      window.removeEventListener('beforeunload', () => leaveSession());
    };
  }, [leaveSession]);

  return {
    streamList,
  };
}

export function useSellerOV(userId: number, auctionRoomId: number, seller: boolean) {
  const [publisher, setPublisher] = useState<Publisher | null>();
  const [session, setSession] = useState<Session | null>();

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setPublisher(null);
  }, [session]);

  useEffect(() => {
    if (userId && auctionRoomId && seller) {
      const openVidu = new OpenVidu();
      const session = openVidu.initSession();
      console.log('오픈비두 연결 요청');
      session.on('exception', exception => {
        console.warn(exception);
      });

      getToken(String(auctionRoomId)).then(token => {
        session!
          .connect(token, JSON.stringify({ userId }))
          .then(async () => {
            await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            const devices = await openVidu.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            const publisher = openVidu.initPublisher('', {
              audioSource: undefined,
              videoSource: videoDevices[0].deviceId,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x480',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            });

            setPublisher(publisher);
            session.publish(publisher);
            console.log('오픈비두 연결 요청');
          })
          .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
          });
      });

      setSession(session);

      return leaveSession;
    }
  }, [auctionRoomId, userId, seller]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => leaveSession());
    return () => {
      window.removeEventListener('beforeunload', () => leaveSession());
    };
  }, [leaveSession]);

  const onChangeCameraStatus = useCallback(
    (status: boolean) => {
      publisher?.publishVideo(status);
    },
    [publisher]
  );

  const onChangeMicStatus = useCallback(
    (status: boolean) => {
      publisher?.publishAudio(status);
    },
    [publisher]
  );

  return {
    publisher,
    onChangeCameraStatus,
    onChangeMicStatus,
    leaveSession,
  };
}

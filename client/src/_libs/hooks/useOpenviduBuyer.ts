import { OpenVidu, StreamManager, Session } from 'openvidu-browser';
import { getToken } from '../../api/openViduApi';
import { useCallback, useEffect, useMemo, useState } from 'react';

type StreamData = {
  streamManager: StreamManager;
  userId: number;
};

export function useOpenviduBuyer(userId: number, meetingRoomId: number) {
  const [subscribers, setSubscribers] = useState<StreamData[]>([]);
  const [session, setSession] = useState<Session | null>();

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setSubscribers([]);
  }, [session]);

  useEffect(() => {
    const openVidu = new OpenVidu();
    const session = openVidu.initSession();

    session.on('streamCreated', event => {
      const subscriber = session.subscribe(event.stream, '');
      const data = JSON.parse(event.stream.connection.data);
      setSubscribers(prev => {
        return [...prev.filter(it => it.userId !== +data.userId), { streamManager: subscriber, userId: +data.userId }];
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

    getToken(String(meetingRoomId)).then(token => {
      session!.connect(token, JSON.stringify({ userId })).catch(error => {
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
    });

    setSession(session);
    return leaveSession;
  }, [meetingRoomId, userId]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => leaveSession());
    return () => {
      window.removeEventListener('beforeunload', () => leaveSession());
    };
  }, [leaveSession]);

  const streamList = useMemo(() => subscribers, [subscribers]);

  return {
    streamList,
  };
}

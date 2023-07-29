import { OpenVidu, Publisher, StreamManager, Session } from 'openvidu-browser';
import { getToken } from '../../api/openviduApi';
import { useCallback, useEffect, useMemo, useState } from 'react';

type StreamData = {
  streamManager: StreamManager;
  userId: number;
};

export function useOpenviduSeller(userId: number, roomId: number) {
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
    const openVidu = new OpenVidu();
    const session = openVidu.initSession();

    session.on('exception', exception => {
      console.warn(exception);
    });

    getToken(String(roomId)).then(token => {
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
        })
        .catch(error => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });

    setSession(session);
    return leaveSession;
  }, [roomId, userId]);

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
  };
}

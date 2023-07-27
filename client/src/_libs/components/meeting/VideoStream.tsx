import React, { useEffect } from 'react';
import { OpenVidu, StreamManager } from 'openvidu-browser';
import { useStream } from '../../hooks/useStream';
interface VideoStreamProps {
  sessionId: string;
  token: string;
}

const VideoStream: React.FC<VideoStreamProps> = ({ sessionId, token }) => {
  const OV = new OpenVidu();
  const session = OV.initSession();
  const publisher = OV.initPublisher(undefined, {});

  useEffect(() => {
    session
      .connect(token)
      .then(() => {
        session.publish(publisher);
      })
      .catch(error => {
        console.log('There was an error connecting to the session:', error.code, error.message);
      });

    return () => {
      session.disconnect();
    };
  }, [session, publisher, token]);

  const { speaking, micStatus, videoStatus, videoRef } = useStream(publisher);

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
      <p>Speaking: {speaking ? 'Yes' : 'No'}</p>
      <p>Microphone: {micStatus ? 'On' : 'Off'}</p>
      <p>Video: {videoStatus ? 'On' : 'Off'}</p>
    </div>
  );
};

export default VideoStream;

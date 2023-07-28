import React, { useRef, useEffect } from 'react';
import { OpenVidu, StreamManager } from 'openvidu-browser';
import { useOpenvidu } from '../../hooks/useOpenvidu';
import { useStream } from '../../hooks/useStream';

interface SellerStreamProps {
  roomId: number;
  userId: number;
  userType: 'seller';
}

const SellerStream: React.FC<SellerStreamProps> = ({ roomId, userId, userType = 'seller' }) => {
  const { publisher, onChangeCameraStatus, onChangeMicStatus } = useOpenvidu(userId, roomId, userType);

  const { speaking, micStatus, videoStatus, videoRef } = useStream(publisher || undefined);

  useEffect(() => {
    if (publisher && videoRef?.current) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher]);

  const handleMicToggle = () => {
    if (publisher) {
      onChangeMicStatus(!publisher.stream.audioActive);
    }
  };

  const handleCameraToggle = () => {
    if (publisher) {
      onChangeCameraStatus(!publisher.stream.videoActive);
    }
  };

  return (
    <div>
      <h2>Seller Stream</h2>
      {publisher && <video ref={videoRef} autoPlay={true} />}
      <button onClick={handleMicToggle}>Toggle Microphone</button>
      <button onClick={handleCameraToggle}>Toggle Camera</button>
    </div>
  );
};

export default SellerStream;

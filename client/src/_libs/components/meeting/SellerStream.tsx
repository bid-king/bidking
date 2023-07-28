import React, { useEffect } from 'react';
import { useOpenviduSeller } from '../../hooks/useOpenviduSeller';
import { useStream } from '../../hooks/useStream';

interface SellerStreamProps {
  roomId: number;
  userId: number;
  userType: 'seller';
}

export function SellerStream({ roomId, userId, userType = 'seller' }: SellerStreamProps) {
  const { publisher, onChangeCameraStatus, onChangeMicStatus } = useOpenviduSeller(userId, roomId);

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
}

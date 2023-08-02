import React, { useEffect } from 'react';
import { useOpenviduSeller } from '../../hooks/useOpenviduSeller';
import { useStream } from '../../hooks/useStream';
import { Text } from '../common/Text';

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
    <div css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem', border: '1px solid transparent' }}>
      {publisher ? (
        <video ref={videoRef} autoPlay={true} />
      ) : (
        <Text content={'인증된 사용자가 아닙니다.'} type="bold" />
      )}
      <button onClick={handleMicToggle}>Toggle Microphone</button>
      <button onClick={handleCameraToggle}>Toggle Camera</button>
    </div>
  );
}

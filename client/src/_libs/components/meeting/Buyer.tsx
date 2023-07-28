import React, { useRef, useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';
import { useOpenvidu } from '../../hooks/useOpenvidu';

interface BuyerStreamProps {
  roomId: number;
  userId: number;
  userType: 'buyer';
}

const BuyerStream: React.FC<BuyerStreamProps> = ({ roomId, userId, userType = 'buyer' }) => {
  const { streamList } = useOpenvidu(userId, roomId, userType);

  const sellerStreamManager = streamList.find(stream => stream.userId !== userId)?.streamManager;

  return (
    <div>
      <h2>Buyer Stream</h2>
      {sellerStreamManager && <Video streamManager={sellerStreamManager} />}
    </div>
  );
};

const Video: React.FC<{ streamManager: StreamManager }> = ({ streamManager }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && streamManager) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video ref={videoRef} autoPlay={true} />;
};

export default BuyerStream;

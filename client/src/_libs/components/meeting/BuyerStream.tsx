import React, { useRef, useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';
import { useOpenviduBuyer } from '../../hooks/useOpenviduBuyer';

interface BuyerStreamProps {
  roomId: number;
  userId: number;
  userType: 'buyer';
}

export function BuyerStream({ roomId, userId, userType = 'buyer' }: BuyerStreamProps) {
  const { streamList } = useOpenviduBuyer(userId, roomId);

  const sellerStreamManager = streamList.find(stream => stream.userId !== userId)?.streamManager;

  return (
    <div>
      <h2>Buyer Stream</h2>
      {sellerStreamManager && <Video streamManager={sellerStreamManager} />}
    </div>
  );
}

function Video({ streamManager }: { streamManager: StreamManager }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && streamManager) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video ref={videoRef} autoPlay={true} />;
}

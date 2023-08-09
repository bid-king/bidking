/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';
import { useOpenviduBuyer } from '../../hooks/useOpenviduBuyer';
import { Text } from '../common/Text';
import colors from '../../design/colors';

export function OrderStream({ err, auctionId, userId, userType = 'order' }: Props) {
  const { streamList } = useOpenviduBuyer(userId, auctionId);
  const sellerStreamManager = streamList.find(stream => stream.userId !== userId)?.streamManager;

  return (
    <div css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem', border: '1px solid transparent' }}>
      {!err && sellerStreamManager ? (
        <Video streamManager={sellerStreamManager} />
      ) : (
        <div
          css={{
            backgroundColor: colors.backgroundLight2,
            border: '1px solid transparent',
            width: '100%',
            height: '100%',
            borderRadius: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <Text content={'인증된 사용자가 아닙니다.'} type="h2" />
          </div>
        </div>
      )}
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

interface Props {
  err: unknown;
  auctionId: number;
  userId: number;
  userType: 'order';
}

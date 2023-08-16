/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';

import { Text } from '../common/Text';
import colors from '../../design/colors';
import { StreamData } from '../../hooks/useOvConnect';

export function OrderStream({ auctionRoomId, userId, userType = 'order', streamList }: Props) {
  const sellerStreamManager = streamList?.find(stream => stream.userId !== userId)?.streamManager;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && sellerStreamManager) {
      sellerStreamManager.addVideoElement(videoRef.current);
    }
  }, [sellerStreamManager]);

  return (
    <div css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem', border: '1px solid transparent' }}>
      {userType === 'order' ? (
        <div>
          <video ref={videoRef} autoPlay={true} css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem' }} />
        </div>
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
            <Text content={'잘못된 접근입니다.'} type="h2" />
          </div>
        </div>
      )}
    </div>
  );
}

// function Video({ streamManager }: { streamManager: StreamManager }) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current && streamManager) {
//       streamManager.addVideoElement(videoRef.current);
//     }
//   }, [streamManager]);

//   return <video ref={videoRef} autoPlay={true} css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem' }} />;
// }

interface Props {
  auctionRoomId: number;
  userId: number;
  userType: 'order';
  streamList: StreamData[] | null;
}

/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
import { StreamManager } from 'openvidu-browser';
import { useOrderStream } from '../../hooks/useOrderStream';
import { Text } from '../common/Text';
import colors from '../../design/colors';

export function OrderStream({ auctionRoomId, userId, userType }: Props) {
  const { streamList } = useOrderStream(userId, auctionRoomId);
  const sellerStreamManager = streamList.find(stream => stream.userId !== userId)?.streamManager;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && sellerStreamManager) {
      sellerStreamManager.addVideoElement(videoRef.current);
    }
  }, [sellerStreamManager]);

  return (
    <div
      css={{
        width: '100%',
        maxHeight: '60vh',
        borderRadius: '1.5rem',
        border: '1px solid transparent',
      }}
    >
      {sellerStreamManager ? (
        <div>
          <video ref={videoRef} autoPlay={true} css={{ width: '100%', maxHeight: '53vh', borderRadius: '1.85rem' }} />
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

interface Props {
  auctionRoomId: number;
  userId: number;
  userType: 'order' | 'seller';
}

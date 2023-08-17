/** @jsxImportSource @emotion/react */
import { Publisher } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import colors from '../../design/colors';
import { useSellerStream } from '../../hooks/useSellerStream';
import { useStream } from '../../hooks/useStream';
import { RoundButton } from '../common/RoundButton';
import { Text } from '../common/Text';

export function SellerStream({ auctionRoomId, userId }: Props) {
  const { publisher, onChangeCameraStatus, onChangeMicStatus, leaveSession } = useSellerStream(userId, auctionRoomId);
  const { speaking, micStatus, videoStatus, videoRef } = useStream(publisher || undefined);

  useEffect(() => {
    console.log(videoRef.current);
    console.log(publisher);
    if (publisher && videoRef?.current) {
      publisher.addVideoElement(videoRef.current);
    }
  }, [publisher, videoRef.current]);

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
        <div>
          <video ref={videoRef} autoPlay={true} css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem' }} />
          <RoundButton
            onClick={handleMicToggle}
            color={micStatus ? 'white' : 'confirm'}
            label={micStatus ? '마이크 끄기' : '마이크 켜기'}
          />
          <RoundButton
            onClick={handleCameraToggle}
            color={videoStatus ? 'white' : 'confirm'}
            label={videoStatus ? '카메라 끄기' : '카메라 켜기'}
          />
        </div>
      ) : (
        <div
          css={{
            backgroundColor: colors.backgroundDark2,
            border: '1px solid transparent',
            width: '100%',
            height: '100%',
            borderRadius: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div css={{ color: colors.white }}>
            <Text content={'화면을 송출할 수 없습니다'} type="h2" />
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  auctionRoomId: number;
  userId: number;
}

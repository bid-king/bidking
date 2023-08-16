/** @jsxImportSource @emotion/react */
import { Publisher } from 'openvidu-browser';
import React, { useEffect } from 'react';
import colors from '../../design/colors';
import { useStream } from '../../hooks/useStream';
import { RoundButton } from '../common/RoundButton';
import { Text } from '../common/Text';

export function SellerStream({
  auctionRoomId,
  userId,
  userType = 'seller',
  publisher,
  onChangeCameraStatus,
  onChangeMicStatus,
  leaveOpenvidu,
}: Props) {
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
        <div>
          <video ref={videoRef} autoPlay={true} css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem' }} />
          <RoundButton
            onClick={handleMicToggle}
            color={publisher.stream.audioActive ? 'white' : 'confirm'}
            label={publisher.stream.audioActive ? '마이크 끄기' : '마이크 켜기'}
          />
          <RoundButton
            onClick={handleCameraToggle}
            color={publisher.stream.videoActive ? 'white' : 'confirm'}
            label={publisher.stream.videoActive ? '카메라 끄기' : '카메라 켜기'}
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
            <Text content={'인증된 사용자가 아닙니다.'} type="h2" />
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  auctionRoomId: number;
  userId: number;
  userType: 'seller';
  publisher: Publisher;
  onChangeCameraStatus: (arg: boolean) => void;
  onChangeMicStatus: (arg: boolean) => void;
  leaveOpenvidu: () => void;
}

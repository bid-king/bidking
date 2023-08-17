/** @jsxImportSource @emotion/react */
import { Publisher } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import colors from '../../design/colors';
import { useSellerStream } from '../../hooks/useSellerStream';
import { useStream } from '../../hooks/useStream';
import { RoundButton } from '../common/RoundButton';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';

export function SellerStream({ auctionRoomId, userId }: Props) {
  const { publisher, onChangeCameraStatus, onChangeMicStatus, leaveSession, session, setSession } = useSellerStream(
    userId,
    auctionRoomId
  );
  const { speaking, micStatus, videoStatus, videoRef } = useStream(publisher || undefined);

  const [mic, setMic] = useState<boolean | null | undefined>(null);
  const [cam, setCam] = useState<boolean | null | undefined>(null);

  useEffect(() => {
    if (publisher && videoRef?.current) {
      publisher.addVideoElement(videoRef.current);
    }

    return () => {
      session?.disconnect();
      setSession(null);
    };
  }, [publisher, videoRef.current]);

  const handleMicToggle = () => {
    if (publisher) {
      onChangeMicStatus(!publisher.stream.audioActive);
      setMic(!publisher.stream.audioActive);
    }
  };

  const handleCameraToggle = () => {
    if (publisher) {
      onChangeCameraStatus(!publisher.stream.videoActive);
      setCam(!publisher.stream.videoActive);
    }
  };

  return (
    <div css={{ width: '100%', height: '56.25%', borderRadius: '1.5rem', border: '1px solid transparent' }}>
      {publisher ? (
        <div>
          <video
            ref={videoRef}
            autoPlay={true}
            css={{ width: '100%', height: '56.25%', maxHeight: '50vh', borderRadius: '1.5rem' }}
          />
          <RoundButton
            onClick={handleMicToggle}
            color={mic ? 'white' : 'confirm'}
            label={mic ? '마이크 끄기' : '마이크 켜기'}
          />
          <Spacing rem="0.5" dir="h" />
          <RoundButton
            onClick={handleCameraToggle}
            color={cam ? 'white' : 'confirm'}
            label={cam ? '카메라 끄기' : '카메라 켜기'}
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

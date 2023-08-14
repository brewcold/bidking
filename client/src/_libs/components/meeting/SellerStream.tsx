/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import colors from '../../design/colors';
import { useOpenviduSeller } from '../../hooks/useOpenviduSeller';
import { useStream } from '../../hooks/useStream';
import { RoundButton } from '../common/RoundButton';
import { Text } from '../common/Text';

export function SellerStream({ auctionRoomId, userId, userType = 'seller' }: Props) {
  const { publisher, onChangeCameraStatus, onChangeMicStatus, leaveSession } = useOpenviduSeller(userId, auctionRoomId);
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
          <RoundButton onClick={handleMicToggle} label={'마이크 켜기'} />
          <RoundButton onClick={handleCameraToggle} label={'카메라 켜기'} />
          <RoundButton onClick={leaveSession} label={'세션 나가기'} color="delete" />
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
}

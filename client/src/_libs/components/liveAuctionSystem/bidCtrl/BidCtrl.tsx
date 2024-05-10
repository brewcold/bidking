/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auctionEnd, descStart } from '../../../../api/live';
import { liveAuctionStatusSelector } from '../../../../recoil-states/live/liveAuctionStatus';
import { useAppSelector } from '../../../../redux-store/hooks';
import { useLiveInfo } from '../../../hooks/useLiveInfo';
import { useSocketEmitter } from '../../../hooks/useSocket';
import { ConfirmButton } from '../../common/ConfirmButton';

export function BidCtrl() {
  const navigate = useNavigate();

  const { accessToken } = useAppSelector(state => state.user);
  const { roomInfo } = useLiveInfo();
  const [liveStatus, setLiveStatus] = useRecoilState(liveAuctionStatusSelector);

  const { EMIT: bidStart } = useSocketEmitter('bidStart', {
    roomId: roomInfo?.auctionRoomId,
  });

  const { EMIT: leaveAuctionRoom } = useSocketEmitter('leaveRoom', {
    roomId: roomInfo?.auctionRoomId,
  });

  switch (liveStatus) {
    case 'BEFORE_DESC':
      return (
        <ConfirmButton
          label={'상품 소개 시작하기'}
          onClick={async () => {
            await descStart(roomInfo?.auctionRoomId || -1, accessToken);
            setLiveStatus('IN_DESC');
          }}
        />
      );
    case 'IN_DESC':
      return (
        <ConfirmButton
          label={'상품 경매 시작하기'}
          color="ok"
          onClick={() => {
            bidStart();
            setLiveStatus('IN_AUCTION');
          }}
        />
      );
    case 'IN_AUCTION':
      return <ConfirmButton disable={true} label={'경매 진행 중...'} />;
    default:
      return (
        <ConfirmButton
          color={'warn'}
          label={'경매 종료하고 나가기'}
          onClick={async () => {
            try {
              await auctionEnd(roomInfo?.auctionRoomId || -1, accessToken);
              leaveAuctionRoom();
            } finally {
              navigate('/seller');
            }
          }}
        />
      );
  }
}

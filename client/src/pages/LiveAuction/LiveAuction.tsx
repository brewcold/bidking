/** @jsxImportSource @emotion/react */
import React, { ReactNode, useContext } from 'react';
import { AuctionNotice } from '../../_libs/components/liveAuctionSystem/auctionNotice/AuctionNotice';
import { AuctionSystem } from '../../_libs/components/liveAuctionSystem/AuctionSystem';
import { AuctionHeader } from '../../_libs/components/liveAuctionSystem/auctionHeader/AuctionHeader';
import { Spacing } from '../../_libs/components/common/Spacing';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';
import { useLiveInfo } from '../../_libs/hooks/useLiveInfo';
import { SocketContext, useSocketEmitter, useSocketListener } from '../../_libs/hooks/useSocket';
import { View } from '../../_libs/components/common/View';
import { AUCTION_SIDEBAR, NOTICE_WRAPPER, STREAM, STREAM_WRAPPER, WRAPPER } from './LiveAuction.css';
import { ChatRoom } from '../../_libs/components/liveAuctionSystem/chatRoom/ChatRoom';
import { LiveItemResponse } from '../../_libs/types/live-item';
import { arrayPadding } from '../../_libs/util/arrayPadding';
import { useSetRecoilState } from 'recoil';
import { liveItemListSelector } from '../../recoil-states/bid/live-item-list';

export function LiveAuction() {
  const socket = useContext(SocketContext);
  const { roomInfo } = useLiveInfo();
  const setItemList = useSetRecoilState(liveItemListSelector);

  const { errors: emitErr } = useSocketEmitter('enterRoom', {
    nickname: roomInfo?.nickname,
    roomId: roomInfo?.auctionRoomId,
    seller: roomInfo?.seller,
  });

  const { errors: listenErr } = useSocketListener<LiveItemResponse>('init', data => {
    const adjustedList = arrayPadding(data, data[0], 2);
    setItemList(adjustedList);
  });

  if (emitErr.length > 0 || listenErr.length > 0) return <View css={WRAPPER} />;
  else
    return (
      <SocketContext.Provider value={socket}>
        <View css={WRAPPER}>
          <AuctionHeader />

          <Spacing rem="0.5" />

          <View css={STREAM_WRAPPER}>
            <View css={STREAM}>
              <SellerStream />
            </View>
          </View>

          <Spacing rem="0.5" />

          <View css={NOTICE_WRAPPER}>
            <AuctionNotice />
          </View>

          <View css={AUCTION_SIDEBAR}>
            <AuctionSystem />
            <Spacing rem="0.5" />
            <ChatRoom />
          </View>
        </View>
      </SocketContext.Provider>
    );
}

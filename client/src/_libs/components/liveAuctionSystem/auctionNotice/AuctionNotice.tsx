/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, MutableRefObject, useState } from 'react';
import { Socket } from 'socket.io-client';
import colors from '../../../design/colors';
import { Text } from '../../common/Text';
import { Input } from '../../common/Input';
import { Spacing } from '../../common/Spacing';
import { RoundButton } from '../../common/RoundButton';
import { bidPriceParse } from '../../../util/bidPriceParse';
import { useSocketEmitter, useSocketListener } from '../../../hooks/useSocket';
import { useRecoilValue } from 'recoil';
import { liveItemStatusSelector } from '../../../../recoil-states/bid/live-item-list';
import { NoticeResponse } from '../../../types/chat';
import { BidFailResponse, BidSuccessResponse } from '../../../types/bid';
import { useLiveInfo } from '../../../hooks/useLiveInfo';

export function AuctionNotice() {
  const { roomInfo } = useLiveInfo();
  const itemList = useRecoilValue(liveItemStatusSelector);

  const [notice, setNotice] = useState<string[]>(['']);
  const [noticeInput, setNoticeInput] = useState<string>('');

  useSocketListener<NoticeResponse>('notice', ({ msg }) => setNotice([msg, ...notice]));
  useSocketListener<BidSuccessResponse>('successBid', ({ itemId, nickname, price }) => {
    const currentItem = itemList?.find(item => item.itemId === itemId);
    const msg = `<SYSTEM> ${currentItem?.name} 상품이 ${nickname}님께 ${bidPriceParse(price)}원에 낙찰되었어요.`;
    setNotice([msg, ...notice]);
  });
  useSocketListener<BidFailResponse>('successBid', ({ itemId }) => {
    const result = itemList?.find(item => item.itemId === itemId);
    const msg = `<SYSTEM> ${result?.name} 상품이 유찰되었어요.`;
    setNotice([msg, ...notice]);
  });

  const { EMIT: noticeTrigger } = useSocketEmitter('notice', {
    roomId: roomInfo?.auctionRoomId,
    msg: noticeInput.trim(),
  });

  const handleNotice = () => {
    noticeInput.trim().length > 0 && noticeTrigger();
    setNoticeInput('');
  };

  return (
    <>
      {roomInfo?.seller && (
        <>
          <Spacing rem="0.5" />
          <form
            autoComplete="off"
            css={{ display: 'flex' }}
            onSubmit={e => {
              e.preventDefault();
              handleNotice();
            }}
          >
            <Input
              placeholder="공지사항을 입력하세요."
              size="large"
              theme="dark"
              shape="round"
              value={noticeInput}
              onChange={e => setNoticeInput(e.target.value)}
              onKeyDown={e => e.key === 'enter' && handleNotice()}
            />
            <Spacing rem="0.5" dir="h" />
            <RoundButton type="submit" size="large" color="confirm" label="보내기" />
          </form>
          <Spacing rem="1" />
        </>
      )}

      <div
        css={{
          padding: '1rem 1.5rem 1rem 1.5rem',
          height: '14vh',
          borderRadius: '1.85rem',
          backgroundColor: roomInfo?.seller ? colors.backgroundDark2 : colors.backgroundLight2,
          overflow: 'auto',
        }}
      >
        <div css={{}}>
          {notice.map((item, idx) => {
            if (item.indexOf('SYSTEM') === 1)
              if (item.indexOf('상품이 유찰되었어요.') > 0)
                return (
                  <div key={idx} css={{ color: colors.disabled }}>
                    <Text content={item} type="bold" />
                    <Spacing rem="0.25" />
                  </div>
                );
            if (item.indexOf('SYSTEM') === 1) {
              if (item.indexOf('원에 낙찰되었어요.') > 0)
                return (
                  <div key={idx} css={{ color: colors.ok }}>
                    <Text content={item} type="bold" />
                    <Spacing rem="0.25" />
                  </div>
                );
            }
            return (
              <div key={idx} css={{ color: roomInfo?.seller ? colors.white : colors.black }}>
                <Text content={item} />
                <Spacing rem="0.25" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  auctionRoomId: number;
  socket: MutableRefObject<Socket | null>;
  userType: 'order' | 'seller';
}

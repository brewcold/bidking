/** @jsxImportSource @emotion/react */
import React from 'react';
import { Spacing } from '../../common/Spacing';
import { useLiveInfo } from '../../../hooks/useLiveInfo';
import { AuctionStatusText } from './auctionStatusText/AuctionStatusText';
import { AuctionItemList } from './auctionItem/AuctionItemList';
import { View } from '../../common/View';
import { BASE, INNER } from './AuctionItemStatus.css';

export function AuctionItemStatus() {
  const { roomInfo } = useLiveInfo();
  const theme = roomInfo?.seller ? 'dark' : 'light';

  return (
    <View css={BASE(theme)}>
      <View css={INNER(theme)}>
        <AuctionItemList />
        <Spacing rem="1" />
        <AuctionStatusText />
      </View>
    </View>
  );
}

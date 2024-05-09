/** @jsxImportSource @emotion/react */
import React from 'react';
import { Text } from '../../../common/Text';
import { LiveItem } from '../../../../types/live-item';
import { View } from '../../../common/View';
import { ITEM_BASE } from './AuctionItem.css';
export function AuctionItem({ item }: Props) {
  return (
    <View css={ITEM_BASE(item)}>
      <Text type="bold" content={ITEM_STATUS_UI_TEXT[item.status]} />
    </View>
  );
}

const ITEM_STATUS_UI_TEXT = {
  dummy: '',
  before: '대기',
  in: '',
  fail: '유찰',
  complete: '낙찰',
};

interface Props {
  item: LiveItem;
  idx: number;
}

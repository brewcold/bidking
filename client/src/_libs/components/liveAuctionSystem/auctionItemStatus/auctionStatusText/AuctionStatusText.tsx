import { useRecoilValue } from 'recoil';
import { currentBidProcessSelector } from '../../../../../recoil-states/bid/current-order';
import { liveItemStatus } from '../../../../../recoil-states/bid/live-item-list';
import { useLiveInfo } from '../../../../hooks/useLiveInfo';
import { bidPriceParse } from '../../../../util/bidPriceParse';
import { Spacing } from '../../../common/Spacing';
import { Txt } from '../../../common/Txt';
import { View } from '../../../common/View';
import { BLANK, BLANK_INFO, ITEM } from './AuctionStatusText.css';

export function AuctionStatusText() {
  const BID_STATE = useRecoilValue(currentBidProcessSelector);

  switch (BID_STATE) {
    case 'BEFORE_LIVE':
      return <AuctionStatusText.BeforeLive />;
    case 'ON_LIVE':
      return <AuctionStatusText.OnLive />;
    case 'OFF_LIVE':
      return <AuctionStatusText.OffLive />;
  }
}

AuctionStatusText.OnLive = () => {
  const { roomInfo } = useLiveInfo();
  const itemList = useRecoilValue(liveItemStatus);

  return (
    <View>
      {itemList.map((item, idx) => {
        if (item.itemId !== roomInfo?.currentItemId) return null;
        else
          return (
            <View key={idx} css={{ display: 'flex', alignItems: 'center' }}>
              <View css={ITEM(item)} />
              <Spacing rem="1" dir="h" />
              <View css={{ display: 'flex', flexDirection: 'column' }}>
                <Txt as="h3">{item.name}</Txt>
                <Spacing rem="0.25" />
                <Txt>경매 시작가</Txt>
                <Spacing rem="0.5" />
                <Txt>{`${bidPriceParse(item.startPrice)} 원`}</Txt>
              </View>
            </View>
          );
      })}
    </View>
  );
};

AuctionStatusText.BeforeLive = () => {
  return (
    <View>
      <View css={BLANK}>
        <Txt as="h1">경매 대기</Txt>
      </View>
      <Spacing rem="1" dir="h" />
      <View css={BLANK_INFO}>
        <Txt as="h1">-</Txt>
      </View>
    </View>
  );
};

AuctionStatusText.OffLive = () => {
  return (
    <View>
      <View css={BLANK}>
        <Txt as="h1">경매 종료</Txt>
      </View>
      <Spacing rem="1" dir="h" />
      <View css={BLANK_INFO}>
        <Txt as="h1">-</Txt>
      </View>
    </View>
  );
};

import { useRecoilValue } from 'recoil';
import { currentItemSelector } from '../../../../../recoil-states/bid/current-item-id';
import { liveItemStatus } from '../../../../../recoil-states/bid/live-item-status';

import { View } from '../../../common/View';
import { AuctionItem } from './AuctionItem';

export function AuctionItemList() {
  const itemList = useRecoilValue(liveItemStatus);
  const IS_ITEM = useRecoilValue(currentItemSelector);

  return (
    <View css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {itemList ? (
        itemList?.map((item, idx) => {
          if (IS_ITEM) return <AuctionItem item={item} idx={idx} key={idx} />;
        })
      ) : (
        <View />
      )}
    </View>
  );
}

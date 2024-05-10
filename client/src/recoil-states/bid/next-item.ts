import { atom, selector } from 'recoil';
import { liveItemListSelector } from './live-item-list';

const key = 'bidResult';

interface BidResult {
  itemId: number;
  status: 'before' | 'in' | 'fail' | 'complete' | 'dummy';
}

const bidResult = atom<BidResult>({
  key,
  default: {
    itemId: 0,
    status: 'before',
  },
});

export const bidResultSelector = selector({
  key,
  get: ({ get }) => {
    const id = get(bidResult);
    return id;
  },
  set: ({ get, set }, result) => {
    set(bidResult, result);
    const itemList = get(liveItemListSelector);
    const values = get(bidResult);
    const newItemList = itemList.map(item => {
      if (item.itemId === values.itemId) item.status = values.status;
      return item;
    });
    set(liveItemListSelector, newItemList);
  },
});

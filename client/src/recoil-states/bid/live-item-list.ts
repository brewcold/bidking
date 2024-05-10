import { atom, selector } from 'recoil';
import { LiveItemResponse } from '../../_libs/types/live-item';

const key = 'liveItemStatus';

const liveItemList = atom<LiveItemResponse>({
  key,
  default: [],
});

export const liveItemListSelector = selector({
  key,
  get: ({ get }) => {
    const itemList = get(liveItemList);
    return itemList;
  },
  set: ({ set }, value) => {
    set(liveItemList, value);
  },
});

export const liveItemLengthSelector = selector({
  key,
  get: ({ get }) => {
    const itemList = get(liveItemList);
    return itemList.length;
  },
});

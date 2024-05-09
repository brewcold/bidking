import { atom, selector } from 'recoil';
import { LiveItemResponse } from '../../_libs/types/live-item';

const key = 'liveItemStatus';

const liveItemStatus = atom<LiveItemResponse>({
  key,
  default: [],
});

export const liveItemStatusSelector = selector({
  key,
  get: ({ get }) => {
    const itemList = get(liveItemStatus);
    return itemList;
  },
  set: ({ set }, value) => {
    set(liveItemStatus, value);
  },
});

export const liveItemLengthSelector = selector({
  key,
  get: ({ get }) => {
    const itemList = get(liveItemStatus);
    return itemList.length;
  },
});

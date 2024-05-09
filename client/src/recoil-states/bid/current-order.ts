import { objectKeys } from '@syyu/util';
import { atom, selector } from 'recoil';
import { itemState } from '../../_libs/types/item-state';
import { liveItemLengthSelector } from './live-item-status';

const key = 'currentOrder';

const currentOrder = atom<number>({
  key,
  default: 2,
});

export const currentOrderSelector = selector<number>({
  key,
  get: ({ get }) => get(currentOrder),
  set: ({ set }, value) => set(currentOrder, value),
});

export const currentBidProcessSelector = selector<itemState>({
  key,
  get: ({ get }) => {
    const order = get(currentOrder);
    const length = get(liveItemLengthSelector);

    const STATE = {
      BEFORE_LIVE: order < 2,
      ON_LIVE: order >= 2 && order <= length - 2,
      OFF_LIVE: order > length - 2,
    };

    const result = objectKeys(STATE).filter(key => STATE[key] === true);
    return result[0];
  },
});

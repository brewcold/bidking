import { atom, selector } from 'recoil';
import { currentOrderSelector } from './current-order';

const key = 'currentItemId';

const currentItemId = atom<number>({
  key,
  default: -1,
});

export const currentItemIdSelector = selector<number>({
  key,
  get: ({ get }) => get(currentItemId),
  set: ({ set }, value) => set(currentItemId, value),
});

export const currentItemSelector = selector<boolean>({
  key,
  get: ({ get }) => {
    const order = get(currentOrderSelector);
    const current = get(currentItemId);
    const IS_ITEM = current >= order - 2 && current <= order + 2;
    return IS_ITEM;
  },
});

import { atom, selector } from 'recoil';
import { BidSuccessResponse } from '../../_libs/types/bid';

const key = 'timer';

const timer = atom<BidSuccessResponse>({
  key,
  default: {
    itemId: -1,
    userId: -1,
    nickname: '',
    price: 0,
    time: -1,
  },
});

export const timerSelector = selector({
  key,
  get: ({ get }) => get(timer),
  set: ({ set }, value) => set(timer, value),
});

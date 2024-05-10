import { atom, selector } from 'recoil';
import { BidSuccessResponse } from '../../_libs/types/bid';

const key = 'bidStatus';

const bidStatus = atom<BidSuccessResponse>({
  key,
  default: {
    itemId: -1,
    userId: -1,
    nickname: '',
    price: 0,
    time: -1,
  },
});

export const bidStatusSelector = selector({
  key,
  get: ({ get }) => get(bidStatus),
  set: ({ set }, value) => set(bidStatus, value),
});

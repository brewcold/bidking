import { atom, selector } from 'recoil';

type itemBiddingStatus = 'BEFORE' | 'IN_AUCTION' | 'END';
const key = 'itemBiddingStatus';

const itemBiddingStatus = atom<itemBiddingStatus>({
  key,
  default: 'BEFORE',
});

export const itemBiddingStatusSelector = selector({
  key,
  get: ({ get }) => {
    const result = get(itemBiddingStatus);
    return result;
  },
  set: ({ set }, value) => {
    set(itemBiddingStatus, value);
  },
});

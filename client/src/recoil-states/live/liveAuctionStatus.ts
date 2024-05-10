import { atom, selector } from 'recoil';

type liveAuctionStatus = 'BEFORE_START' | 'IN_AUCTION' | 'BEFORE_DESC' | 'IN_DESC' | 'END';
const key = 'liveAuctionStatus';

const liveAuctionStatus = atom<liveAuctionStatus>({
  key,
  default: 'BEFORE_START',
});

export const liveAuctionStatusSelector = selector({
  key,
  get: ({ get }) => get(liveAuctionStatus),
  set: ({ set }, value) => set(liveAuctionStatus, value),
});

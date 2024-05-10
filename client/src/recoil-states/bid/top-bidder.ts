import { atom, selector } from 'recoil';

interface topBidderInfo {
  currPrice: number;
  topBidderNickname: string;
}

const key = 'topBidderInfo';
const topBidderInfo = atom<topBidderInfo>({
  key,
  default: {
    currPrice: 0,
    topBidderNickname: '',
  },
});

export const topBidderInfoSelector = selector({
  key,
  get: ({ get }) => get(topBidderInfo),
  set: ({ set }, value) => set(topBidderInfo, value),
});

import { atom, selector } from 'recoil';
import { bidPriceParse } from '../../_libs/util/bidPriceParse';
import { askingPriceSelector } from './asking-price';

const key = 'bidPriceInput';
const bidPriceInput = atom<string>({
  key,
  default: '',
});

export const bidPriceInputSelector = selector({
  key,
  get: ({ get }) => get(bidPriceInput),
  set: ({ set }, value) => set(bidPriceInput, value),
});

export const bidButtonLabelSelector = selector({
  key,
  get: ({ get }) => {
    const askingPrice = get(askingPriceSelector);
    return String(askingPrice).length < 13
      ? bidPriceParse(askingPrice) + '원 즉시입찰'
      : '1조 원 미만으로 입찰할 수 있어요';
  },
});

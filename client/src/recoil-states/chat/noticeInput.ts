import { atom, selector } from 'recoil';

const key = 'noticeInput';
const noticeInput = atom<string>({
  key,
  default: '',
});

export const noticeInputSelector = selector({
  key,
  get: ({ get }) => get(noticeInput),
  set: ({ set }, value) => set(noticeInput, value),
});

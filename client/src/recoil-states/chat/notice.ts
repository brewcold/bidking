import { atom, selector } from 'recoil';
import { Notices } from '../../_libs/types/chat';

const key = 'notice';

const notices = atom<Notices>({
  key,
  default: [],
});

export const noticeSelector = selector({
  key,
  get: ({ get }) => get(notices),
  set: ({ set }, value) => set(notices, value),
});

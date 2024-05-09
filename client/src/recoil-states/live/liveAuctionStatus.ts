import { atom, selector } from 'recoil';
import { ChatResponse, ChattingRoom } from '../../_libs/types/chat';

const key = 'liveAuctionStatus';

const chats = atom<ChattingRoom>({
  key,
  default: [],
});

export const chatSelector = selector({
  key,
  get: ({ get }) => get(chats),
  set: ({ set }, value) => set(chats, value),
});

export interface NoticeResponse {
  msg: string;
}

export interface ChatResponse {
  nickname: string;
  msg: string;
}

export type Notices = NoticeResponse[];
export type ChattingRoom = ChatResponse[];

export interface NewUserResponse {
  newUser: string;
}

export interface AuctionEnterResponse {
  nickname: string;
  sellerNickname: string;
  auctionRoomType: 'COMMON' | 'REVERSE';
  title: string;
  auctionRoomId: number;
  currentItemId: number;
  seller: boolean;
}

export interface RoomInfo {
  userId: string;
  roomInfo?: AuctionEnterResponse;
  isLoading: boolean;
}

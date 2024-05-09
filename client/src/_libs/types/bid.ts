export interface BidSuccessResponse {
  itemId: number;
  userId: number;
  nickname: string;
  price: number;
  time: number;
}

export interface BidFailResponse {
  itemId: number;
}

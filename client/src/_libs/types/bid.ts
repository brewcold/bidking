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

export interface BidNextItemResponse {
  itemId: number;
  price: number;
  askingPrice: number;
}
export interface BidResultResponse {
  itemId: number;
  userId: number;
  nickname: string;
  price: number;
  askingPrice: number;
  time: string;
}

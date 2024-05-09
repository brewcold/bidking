export interface LiveItem {
  imageUrl: string;
  itemId: number;
  name: string;
  status: 'before' | 'in' | 'fail' | 'complete' | 'dummy';
  desc: string;
  startPrice: number;
}
export type LiveItemResponse = Array<LiveItem>;

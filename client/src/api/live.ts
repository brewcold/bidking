import { Socket } from 'socket.io-client';
import { AuctionEnterResponse } from '../_libs/types/auction-enter';
import { https } from '../_libs/util/http';
export function enter(auctionId: number, token: string) {
  return https.get<AuctionEnterResponse>(`/api/v1/bid/${auctionId}/enter`, token);
}
export function getItems(auctionId: number, token: string) {
  return https.get<AuctionEnterResponse>(`/api/v1/bid/${auctionId}/items`, token);
}
export function descStart(auctionId: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/start`, token);
}
export function bid(auctionId: number, itemId: number, price: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/items/${itemId}/try`, token, { price });
}
export function auctionEnd(auctionId: number, token: string) {
  return https.post(`/api/v1/bid/${auctionId}/end`, token);
}

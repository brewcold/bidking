/** @jsxImportSource @emotion/react */
import { MutableRefObject, useContext } from 'react';
import { Spacing } from '../common/Spacing';
import { AuctionItemStatus } from './auctionItemStatus/AuctionItemStatus';
import { BidPrice } from './bidPrice/BidPrice';
import { Timer } from './bidTimer/Timer';
import { Bidder } from './bidder/Bidder';
import { BiddingForm } from './bidCtrl/BiddingForm';
import { BidCtrl } from './bidCtrl/BidCtrl';
import { useLiveInfo } from '../../hooks/useLiveInfo';
import { View } from '../common/View';
import { BASE } from './AuctionSystem.css';
import { useSocketEmitter, useSocketListener } from '../../hooks/useSocket';
import { useNavigate } from 'react-router-dom';
import { BidFailResponse, BidNextItemResponse, BidResultResponse } from '../../types/bid';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { topBidderInfoSelector } from '../../../recoil-states/bid/top-bidder';
import { askingPriceSelector } from '../../../recoil-states/bid/asking-price';
import {
  bidPriceInputAutoAbledSelector,
  bidPriceInputDisableSelector,
} from '../../../recoil-states/bid/bid-price-input-disable';
import { liveItemListSelector } from '../../../recoil-states/bid/live-item-list';
import { bidResultSelector } from '../../../recoil-states/bid/next-item';
import { currentItemIdSelector } from '../../../recoil-states/bid/current-item-id';
import { currentOrderSelector } from '../../../recoil-states/bid/current-order';
import { itemBiddingStatusSelector } from '../../../recoil-states/bid/item-bidding-status';
import { isNotInLive } from '../../util/isInLive';

export function AuctionSystem() {
  const { roomInfo } = useLiveInfo();
  const IS_SELLER = Boolean(roomInfo?.seller);
  const theme = roomInfo?.seller ? 'dark' : 'light';

  const navigate = useNavigate();

  const [topBidder, setTopBidder] = useRecoilState(topBidderInfoSelector);
  const [askingPrice, setAskingPrice] = useRecoilState(askingPriceSelector);
  const setAutoDisable = useSetRecoilState(bidPriceInputAutoAbledSelector);
  const setDisable = useSetRecoilState(bidPriceInputDisableSelector);
  const [bidResult, setBidResult] = useRecoilState(bidResultSelector);
  const currentList = useRecoilValue(liveItemListSelector);
  const [currId, setCurrId] = useRecoilState(currentItemIdSelector);
  const [order, setOrder] = useRecoilState(currentOrderSelector);
  const [itemStatus, setItemStatus] = useRecoilState(itemBiddingStatusSelector);

  useSocketListener(
    'start',
    ({ itemId, price, askingPrice }: BidNextItemResponse) => {
      setDisable(false);
      setBidResult({
        itemId,
        status: 'in',
      });
      setTopBidder({
        currPrice: price,
        topBidderNickname: '-',
      });
      setItemStatus('IN_AUCTION');
      setCurrId(itemId);
      setAskingPrice(askingPrice);
    },
    [currId, askingPrice]
  ); //아이템 경매 시작 (전체 경매 시작되는것)

  useSocketListener(
    'next',
    ({ itemId, price, askingPrice }: BidNextItemResponse) => {
      setDisable(true);
      setCurrId(itemId);
      setBidResult({
        itemId,
        status: 'before',
      });
      setTopBidder({
        currPrice: 0,
        topBidderNickname: '-',
      });
      setAskingPrice(askingPrice);
    },
    [currId, askingPrice]
  ); //다음 아이템 설명시작

  useSocketListener('updateBid', ({ itemId, userId, nickname, price, time, askingPrice }: BidResultResponse) => {
    setAutoDisable(true);
    setTopBidder({
      currPrice: price,
      topBidderNickname: nickname,
    });
    setAskingPrice(askingPrice);
  }); //입찰

  useSocketListener(
    'successBid',
    ({ itemId, userId, nickname, price, time, askingPrice }: BidResultResponse) => {
      setAutoDisable(true);
      setTopBidder({
        currPrice: 0,
        topBidderNickname: '-',
      });
      setItemStatus(isNotInLive(order, currentList.length)); //지금 순서가 마지막 순서였으면 끝내고, 아니면 계속 진행
      setBidResult({ itemId, status: 'complete' });
      setCurrId(currentList[order + 1].itemId || -1);
      setOrder(order + 1);
    },
    [topBidder, itemStatus, bidResult, currId, order]
  ); //낙찰

  useSocketListener(
    'failBid',
    ({ itemId }: BidFailResponse) => {
      setDisable(true);
      setBidResult({ itemId, status: 'fail' });
      setCurrId(currentList[order + 1].itemId || -1);
      setItemStatus(isNotInLive(order, currentList.length)); //지금 순서가 마지막 순서였으면 끝내고, 아니면 계속 진행
      setOrder(order + 1);
      setTopBidder({
        currPrice: 0,
        topBidderNickname: '-',
      });
    },
    [currentList, bidResult, currId, order]
  ); //유찰

  const { EMIT: emitCloseEvent } = useSocketEmitter('roomClosed', {
    roomId: roomInfo?.auctionRoomId,
  }); //경매 종료
  useSocketListener('roomClosed', () =>
    emitCloseEvent().finally(() => (IS_SELLER ? navigate('/seller/exit') : navigate('/exit')))
  ); //roomClosed 응답을 받으면 roomClosed 이벤트를 emit해야 함

  if (!roomInfo?.auctionRoomId) return <View css={BASE(IS_SELLER)} />;
  else
    return (
      <View css={BASE(roomInfo?.seller)}>
        <AuctionItemStatus />
        <Spacing rem="1" />
        <Bidder theme={theme} bidder={topBidder.topBidderNickname} />
        <Spacing rem="1" />
        <BidPrice theme={theme} align="center" price={topBidder.currPrice} />
        <Spacing rem="2" />
        <Timer theme={theme} />
        <Spacing rem="2" />
        {IS_SELLER ? <BidCtrl /> : <BiddingForm />}
      </View>
    );
}

/** @jsxImportSource @emotion/react */
import React from 'react';
import { useModal } from '@syyu/util/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bid } from '../../../../api/live';
import { askingPriceSelector } from '../../../../recoil-states/bid/asking-price';
import { bidButtonLabelSelector, bidPriceInputSelector } from '../../../../recoil-states/bid/bid-price-input';
import { bidPriceInputDisableSelector } from '../../../../recoil-states/bid/bid-price-input-disable';
import { currentItemIdSelector } from '../../../../recoil-states/bid/current-item-id';
import { topBidderInfoSelector } from '../../../../recoil-states/bid/top-bidder';
import { useAppSelector } from '../../../../redux-store/hooks';
import { useLiveInfo } from '../../../hooks/useLiveInfo';
import { validateBidPrice } from '../../../util/bidPriceParse';
import { isUnderLimit } from '../../../util/price-validation';
import { Alert } from '../../common/Alert';
import { ConfirmButton } from '../../common/ConfirmButton';
import { Input } from '../../common/Input';
import { Spacing } from '../../common/Spacing';
import { View } from '../../common/View';
import { BIDDING_INPUT_WRAPPER, FORM_BASE, IMMEDIATE_BID_WRAPPER } from './BiddingForm.css';

export function BiddingForm() {
  const { roomInfo } = useLiveInfo();
  const auctionRoomId = roomInfo?.auctionRoomId || -1;
  const theme = roomInfo?.seller ? 'dark' : 'light';

  const targetItem = useRecoilValue(currentItemIdSelector);
  const topBidder = useRecoilValue(topBidderInfoSelector);
  const askingPrice = useRecoilValue(askingPriceSelector);
  const disable = useRecoilValue(bidPriceInputDisableSelector);
  const [bidInputValue, setBidInput] = useRecoilState(bidPriceInputSelector);
  const label = useRecoilValue(bidButtonLabelSelector);

  const { accessToken } = useAppSelector(state => state.user);

  const { open, close } = useModal();

  return (
    <View css={FORM_BASE(theme)}>
      <View css={IMMEDIATE_BID_WRAPPER}>
        <ConfirmButton
          disable={disable}
          btnType="progress"
          label={label}
          onClick={() => (isUnderLimit(askingPrice) ? bid(auctionRoomId, targetItem, askingPrice, accessToken) : {})}
        />
      </View>
      <Spacing rem="2" />
      <View css={BIDDING_INPUT_WRAPPER}>
        <Input
          autoComplete="off"
          theme={theme}
          inputType="text"
          placeholder={'입찰가'}
          value={bidInputValue}
          onChange={e => {
            if (validateBidPrice(e.target.value)) setBidInput(e.target.value);
            else {
              open(
                <Alert close={close} type="error">
                  1조 원 미만의 금액으로 입찰할 수 있어요.
                </Alert>
              );
              setBidInput('');
            }
          }}
          onKeyDown={e => {
            if (e.key === 'Enter')
              open(
                <Alert close={close} type="error">
                  엔터키로는 입찰할 수 없어요.
                </Alert>
              );
          }}
        />
        <Spacing rem="1" dir="h" />
        <ConfirmButton
          disable={disable}
          btnType="confirm"
          label="입찰"
          onClick={() => {
            if (topBidder.currPrice < Number(bidInputValue) && validateBidPrice(bidInputValue)) {
              bid(auctionRoomId, targetItem, Number(bidInputValue), accessToken);
            } else {
              open(
                <Alert close={close} type="error">
                  입찰가는 현재 최고 입찰가보다 높아야 합니다.
                </Alert>
              );
            }
            setBidInput('');
          }}
        />
      </View>
    </View>
  );
}

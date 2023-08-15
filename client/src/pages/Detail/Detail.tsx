/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import auction, { AuctionRoomResponse } from '../../api/auction';
import { ItemCard } from '../../_libs/components/auctionInfo/ItemCard';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';
import { QuestionModal } from '../../_libs/components/auctionCreate/QuestionModal';
import { Checkbox } from '../../_libs/components/common/Checkbox';
import auctionRoomLiveState from '../../_libs/constants/auctionRoomLiveState';
import { detailDateParse } from '../../_libs/util/detailDateParse';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export function Detail() {
  const params = useParams<string>();
  const auctionId = Number(params.auctionId);

  const [detail, setDetail] = useState<AuctionRoomResponse | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isChecked, setChecked] = useState(false);
  const { accessToken } = useAppSelector(state => state.user);

  const handleCheck = () => {
    setChecked(!isChecked);
  };

  useEffect(() => {
    auction
      .get(auctionId, accessToken)
      .then(data => {
        setDetail(data);
      })
      .catch(err => {
        setError(err);
        console.log(err);
      });
  }, [auctionId]);

  if (!detail) {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '10rem',
          backgroundColor: colors.backgroundLight,
        }}
      >
        로딩중입니다.
      </div>
    );
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '10rem',
        backgroundColor: colors.backgroundLight,
        minHeight: '100vh',
      }}
    >
      <Spacing rem="3" />
      <div
        css={{
          width: '50%',
          minHeight: '430px',
          padding: '0 1.5rem 0 1.5rem',
          backgroundColor: colors.backgroundLight2,
          borderRadius: '1.5rem',
        }}
      >
        <Spacing rem="1.5" />
        <Text type="h1" content="경매 정보" />
        <Spacing rem="1" />
        <div>
          <Text type="h1" content={detail.name} />
          <Spacing rem="1" />
          <div
            className="auctionEnterPermission"
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text
              type="h3"
              content={
                detail.auctionRoomType === 'COMMON'
                  ? '일반경매'
                  : detail.auctionRoomType === 'REVERSE'
                  ? '네덜란드 경매'
                  : detail.auctionRoomType
              }
            />
            <Spacing rem="1" dir="h" />
            <div
              css={{
                marginTop: '0.2rem',
              }}
            >
              <QuestionModal
                content1="일반경매(English Auction): 이는 우리가 흔히 생각하는, 가장 전통적인 경매 방식입니다. 경매가 시작될 때 최소 입찰가격이 설정되며, 이후 참여자들은 그 가격보다 높은 가격으로 입찰합니다. 가장 높은 가격을 제시한 참여자가 물건을 얻게 됩니다."
                content2="네덜란드 경매(Dutch Auction): 이 경매 방식은 일반적인 경매와는 반대로, 가장 높은 가격에서 시작하여 점차 가격을 낮추는 방식입니다. 참가자들은 가격이 내려갈수록 입찰을 기다리다가, 자신이 원하는 가격에 도달했을 때 입찰을 합니다. 처음으로 입찰한 사람이 물건을 얻게 됩니다. 이 방식은 일반적으로 꽃이나 농산물 등 시간이 지날수록 가치가 떨어지는 상품을 판매할 때 사용됩니다."
              />
            </div>
            <Spacing rem="1" dir="h" />
          </div>
        </div>
        {detail.auctionRoomLiveState === 'BEFORE_LIVE' && (
          <div>
            <Spacing rem="1" />
            <Text type="h3" content={`${detailDateParse(detail.startedAt)} 시작`} />
          </div>
        )}

        {detail.auctionRoomLiveState === 'BEFORE_LIVE' && (
          <ConfirmButton btnType="disabled" label={auctionRoomLiveState.beforeLive} />
        )}

        {detail.auctionRoomLiveState === 'ON_LIVE' && (
          <div>
            <div
              className="auctionEnterPermission"
              css={{
                display: 'flex',
                color: colors.warn,
                alignItems: 'center',
              }}
            >
              <Text type="p" content="입찰 시 주의사항에 동의해주세요" />
              <Spacing rem="1" dir="h" />
              <div
                css={{
                  marginTop: '0.2rem',
                }}
              >
                <QuestionModal
                  content1="일반경매(English Auction): 이는 우리가 흔히 생각하는, 가장 전통적인 경매 방식입니다. 경매가 시작될 때 최소 입찰가격이 설정되며, 이후 참여자들은 그 가격보다 높은 가격으로 입찰합니다. 가장 높은 가격을 제시한 참여자가 물건을 얻게 됩니다."
                  content2="네덜란드 경매(Dutch Auction): 이 경매 방식은 일반적인 경매와는 반대로, 가장 높은 가격에서 시작하여 점차 가격을 낮추는 방식입니다. 참가자들은 가격이 내려갈수록 입찰을 기다리다가, 자신이 원하는 가격에 도달했을 때 입찰을 합니다. 처음으로 입찰한 사람이 물건을 얻게 됩니다. 이 방식은 일반적으로 꽃이나 농산물 등 시간이 지날수록 가치가 떨어지는 상품을 판매할 때 사용됩니다."
                />
              </div>
              <Spacing rem="1" dir="h" />
              <div
                css={{
                  paddingTop: '0.5rem',
                }}
              >
                <Checkbox
                  theme="light"
                  id="auctionEnterPermission"
                  value="auctionEnterPermission"
                  onChange={handleCheck}
                />
              </div>
            </div>
            {!isChecked && <ConfirmButton btnType="disabled" label="경매 주의사항을 동의 해주세요" />}
            {isChecked && (
              <Link to={`/auction/${auctionId}`}>
                <ConfirmButton btnType="confirm" label={auctionRoomLiveState.onLive} />
              </Link>
            )}
          </div>
        )}
        {detail.auctionRoomLiveState === 'OFF_LIVE' && (
          <ConfirmButton btnType="disabled" label={auctionRoomLiveState.offLive} />
        )}

        <Spacing rem="1" />
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {error && <Text content={error.message} />}

          <Text type="h1" content="경매 물품" />
          <Spacing rem="1" />
          {detail.itemList.map((item, idx) => (
            <div key={idx}>
              <ItemCard item={item} />
              <Spacing rem="1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

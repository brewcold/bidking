/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import auction, { SellerAuctionDetail } from '../../api/auction';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux-store/hooks';

export function useSellerDetailOffLive() {
  const params = useParams<string>();
  const auctionId = Number(params.auctionId);
  const [detail, setDetail] = useState<SellerAuctionDetail | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isChecked, setChecked] = useState(false);
  const { isLogined, accessToken } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const handleCheck = () => {
    setChecked(!isChecked);
  };

  useEffect(() => {
    auction
      .getSeller(auctionId, accessToken)
      .then(data => {
        console.log(data);
        setDetail(data);
      })
      .catch(err => setError(err));
  }, [auctionId]);

  return {
    params,
    auctionId,
    detail,
    error,
    isLogined,
    handleCheck,
    isChecked,
  };
}

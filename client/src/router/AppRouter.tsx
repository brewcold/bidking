import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Main } from '../pages/Main/Main';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/Signup/SignUp';
import { MyPage } from '../pages/MyPage/MyPage';
import { Purchased } from '../pages/Purchased/Purchased';
import { Detail } from '../pages/Detail/Detail';
import { Seller } from '../pages/Seller/Seller';
import { Live } from '../pages/Live/Live';
import { SellerLive } from '../pages/SellerLive/SellerLive';
import { SellerCreateAuction } from '../pages/SellerCreateAuction/SellerCreateAuction';
import { SellerUpdateAuction } from '../pages/SellerUpdateAuction/SellerUpdateAuction';
import { SellerDetail } from '../pages/SellerDetail/SellerDetail';
import { SellerDetailOffLive } from '../pages/SellerDetail/SellerDetailOffLive';
import { Layout } from '../pages/Layout';
import { SellerLayout } from '../pages/SellerLayout';
import { OpenviduTestOrder } from '../pages/OpenviduTestOrder';
import { OpenviduTestSeller } from '../pages/OpenviduTestSeller';
import { useAppSelector } from '../store/hooks';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  return (
    // 구매자 라우터 페이지
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="mypage" element={<ProtectedRoute />}>
          <Route path=":id" element={<MyPage />} />
        </Route>
        <Route path="purchased" element={<ProtectedRoute />}>
          <Route path=":memberId" element={<Purchased />} />
        </Route>
        <Route path="detail" element={<ProtectedRoute />}>
          <Route path=":auctionId" element={<Detail />} />
        </Route>
        <Route path="auction" element={<ProtectedRoute />}>
          <Route path=":auctionId" element={<Live />} />
        </Route>
      </Route>
      {/* 판매자 라우터 페이지 */}
      <Route element={<SellerLayout />}>
        <Route path="seller" element={<ProtectedRoute />}>
          <Route path="create-auction" element={<SellerCreateAuction />} />
          <Route path="update-auction/:auctionId" element={<SellerUpdateAuction />} />
          <Route path="detail/:auctionId" element={<SellerDetail />} />
          <Route path="detail/complete/:auctionId" element={<SellerDetailOffLive />} />
          <Route index element={<Seller />} />
        </Route>
      </Route>
      {/* 네브바가 안들어가는 페이지 및 판매페이지 */}
      <Route path="seller/auction" element={<ProtectedRoute />}>
        <Route path=":auctionId" element={<SellerLive />} />
      </Route>
      <Route path="/seller/openvidu" element={<OpenviduTestSeller />} />
      <Route path="/openvidu" element={<OpenviduTestOrder />} />
    </Routes>
  );
}

// 메인페이지 /
// 로그인 /login
// 마이페이지 /mypage
// 마이페이지-구매내역 /purchased
// 경매 상세 화면 /detail/{autionId}

// 판매자 레이아운 /seller/
// 경매 등록 화면 /seller/create-auction
// 경매 상세 화면 - 판매자 /seller/detail/{auctionId}
// 판매자 완료 물품 상세 화면  /seller/detail/{auctionId}

// NavBar가 존재하지 않음
// 경매 진행 중 화면-구매자 /auction/{autionId}
// 경매 진행 중 화면 - 판매자 /seller/auction/{auctionId}/

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Main } from '../pages/Main/Main';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/Signup/SignUp';
import { MyPage } from '../pages/MyPage/MyPage';
import { Purchased } from '../pages/Purchased/Purchased';
import { Detail } from '../pages/Detail/Detail';
import { Seller } from '../pages/Seller/Seller';
import { LiveAuction } from '../pages/LiveAuction/LiveAuction';
import { SellerCreateAuction } from '../pages/SellerCreateAuction/SellerCreateAuction';
import { SellerUpdateAuction } from '../pages/SellerUpdateAuction/SellerUpdateAuction';
import { SellerDetail } from '../pages/SellerDetail/SellerDetail';
import { SellerDetailOffLive } from '../pages/SellerDetail/SellerDetailOffLive';
import { Layout } from '../pages/Layout';
import { SellerLayout } from '../pages/SellerLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { SellerExit } from '../pages/Exit/SellerExit';
import { NotFound404 } from '../pages/NotFound404';
import { Spinner } from '../_libs/components/common/Spinner';
import { OrderExit } from '../pages/Exit/OrderExit';

export function AppRouter() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* 판매자 라우터 페이지 */}
        <Route element={<SellerLayout />}>
          <Route path="seller" element={<ProtectedRoute />}>
            <Route path="create-auction" element={<SellerCreateAuction />} />
            <Route path="update-auction/:auctionId" element={<SellerUpdateAuction />} />
            <Route path="detail/:auctionId" element={<SellerDetail />} />
            <Route path="detail/complete/:auctionId" element={<SellerDetailOffLive />} />
            <Route path="seller/exit" element={<SellerExit />} />
            <Route index element={<Seller />} />
          </Route>
        </Route>
        <Route path="seller/auction" element={<ProtectedRoute />}>
          <Route path=":auctionId" element={<LiveAuction />} />
        </Route>

        {/* 구매자 라우터 페이지 */}
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
            <Route path=":auctionId" element={<LiveAuction />} />
          </Route>
          <Route path="exit" element={<OrderExit />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Main } from '../pages/Main';
import { Login } from '../pages/Login';
import { MyPage } from '../pages/MyPage';
import { Purchased } from '../pages/Purchased';
import { Detail } from '../pages/Detail';

import { Seller } from '../pages/Seller';
import { Auction } from '../pages/Auction';
import { SellerAuction } from '../pages/SellerAuction';
import { SellerCreateAuction } from '../pages/SellerCreateAuction';
import { SellerDetail } from '../pages/SellerDetail';
import { LayOut } from '../pages/LayOut';
import { LoginLoading } from '../pages/LoginLoading';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<LayOut />}>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/:name" element={<MyPage />} />
        <Route path="/purchased" element={<Purchased />} />
        <Route path="/detail/:auctionId" element={<Detail />} />
        <Route path="/seller/create-auction" element={<SellerCreateAuction />} />
        <Route path="/seller" element={<Seller />}></Route>
        <Route path="/seller/detail/:auctionId" element={<SellerDetail />} />
      </Route>

      {/* 네브바가 안들어가는 페이지 */}
      <Route path="/seller/auction/:auctionId" element={<SellerAuction />} />
      <Route path="/auction/:auctionId" element={<Auction />} />
      <Route path="/login/loading" element={<LoginLoading />} />
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

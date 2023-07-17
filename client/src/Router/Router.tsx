import { Routes, Route, Link } from 'react-router-dom';
import App from '../App';

<Routes>
  <Route path='/' element={<App></App>}></Route>
</Routes>;

// 메인페이지 /
// 로그인 /login
// 마이페이지 /mypage
// 마이페이지-구매내역 /purchased
// 경매 진행 중 화면-구매자 /auction/{autionId}
// 경매 상세 화면 /detail/{autionId}

// 판매자 레이아운 /seller/
// 경매 진행 중 화면 - 판매자 /seller/auction/{auctionId}/hh
// 경매 상세 화면 - 판매자 /seller/detail/{auctionId}
// 판매자 완료 물품 상세 화면  /seller/detail/{auctionId}
// 경매 등록 화면 /seller/createauction
//

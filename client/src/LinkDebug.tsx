import React from 'react';
import { Link } from 'react-router-dom';

export function LinkDebug() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/mypage/user123">MyPage</Link>
          </li>
          <li>
            <Link to="/purchased">구매내역</Link>
          </li>
          <li>
            <Link to="/detail/abc123">경매상세화면</Link>
          </li>
          <li>
            <Link to="/seller/create-auction">경매방 생성</Link>
          </li>
          <li>
            <Link to="/seller">판매자 메인</Link>
          </li>
          <li>
            <Link to="/seller/detail/def456">경매상세화면-판매자</Link>
          </li>
          <li>
            <Link to="/seller/auction/1">판매자 경매진행</Link>
          </li>
          <li>
            <Link to="/auction/1">구매자 경매진행</Link>
          </li>
          <li>
            <Link to="/login/loading">로딩화면</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

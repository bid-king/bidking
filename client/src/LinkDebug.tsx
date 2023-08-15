import React from 'react';
import { Link } from 'react-router-dom';

export function LinkDebug() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/seller/auction/1">판매자 경매진행</Link>
          </li>
          <li>
            <Link to="/auction/1">구매자 경매진행</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

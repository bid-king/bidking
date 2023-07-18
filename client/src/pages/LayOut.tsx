import React from 'react';
import { Outlet } from 'react-router-dom';

export function LayOut() {
  return (
    <div>
      네브바가 여기 들어야가 합니다
      <Outlet></Outlet>
    </div>
  );
}

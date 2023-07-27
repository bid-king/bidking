import React from 'react';
import { Outlet } from 'react-router-dom';
import { Nav } from '../_libs/components/layout/Nav';

export function SellerLayout() {
  return (
    <div>
      <Nav theme="dark" />
      <Outlet />
    </div>
  );
}

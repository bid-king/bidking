import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../_libs/components/navbar/NavBar';

export function SellerLayout() {
  return (
    <div>
      <NavBar theme="dark" />
      <Outlet />
    </div>
  );
}

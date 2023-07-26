import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../_libs/components/navbar/NavBar';

export function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

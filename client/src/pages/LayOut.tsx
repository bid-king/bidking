import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../_libs/components/layout/NavBar';

export function LayOut() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

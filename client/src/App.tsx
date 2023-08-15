import { Global, css } from '@emotion/react';
import React from 'react';
import { AppRouter } from './router/AppRouter';
import { globalStyle } from './_libs/design/globalStyle';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <AppRouter />
    </>
  );
}

export default App;

import { Global, css } from '@emotion/react';
import React from 'react';
import { AppRouter } from './router/AppRouter';
import { LinkDebug } from './LinkDebug';
import { globalStyle } from './_libs/design/globalStyle';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      {/* <LinkDebug /> */}
      <AppRouter />
    </>
  );
}

export default App;

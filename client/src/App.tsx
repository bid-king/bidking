import { Global, css } from '@emotion/react';
import React from 'react';
import { Router } from './Router/Router';
import normalize from 'emotion-normalize';
import { LinkDebug } from './LinkDebug';
import { globalStyle } from './_libs/design/globalStyle';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <LinkDebug />
      <Router />
    </>
  );
}

export default App;

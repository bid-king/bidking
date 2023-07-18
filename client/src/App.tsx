import { Global, css } from '@emotion/react';
import React from 'react';
import { Router } from './Router/Router';
import normalize from 'emotion-normalize';
import { LinkDebug } from './LinkDebug';

function App() {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
          html {
            line-height: 1.75;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            font-size: 1rem;
            font-weight: normal;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <LinkDebug></LinkDebug>
      <Router />
    </>
  );
}

export default App;

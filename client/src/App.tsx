import { Global, css } from '@emotion/react';
import React from 'react';

import normalize from 'emotion-normalize';

function App() {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
          h1, h2, h3, h4, h5, h6, p {
            font-size: 1rem;
            font-weight: normal;
            margin: 0;
          }
        `}
      />
    </>
  );
}

export default App;

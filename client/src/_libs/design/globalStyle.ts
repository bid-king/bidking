import { css } from '@emotion/react';

import colors from './colors';

export const globalStyle = css`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.75;
    font-size: 1rem;
    font-family: 'Pretendard';
    font-weight: 400;
    color: ${colors.black};
  }
  *,
  *::before,
  *::after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
  * {
    margin: 0;
    padding: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Pretendard-Regular.subset.woff2') format('woff2'),
      url('/fonts/Pretendard-Regular.subset.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-display: swap;
    src: url('/fonts/Pretendard-Black.subset.woff2') format('woff2'),
      url('/fonts/Pretendard-Black.subset.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/Pretendard-Bold.subset.woff2') format('woff2'),
      url('/fonts/Pretendard-Bold.subset.woff') format('woff');
  }
`;

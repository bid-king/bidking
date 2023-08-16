/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes } from 'react';
import colors from '../../design/colors';

export function Spinner() {
  return <div dangerouslySetInnerHTML={{ __html: svg }} css={{ fill: colors.confirm }} />;
}

interface Props extends HTMLAttributes<HTMLDivElement> {}

const svg = `<svg width="48" height="48" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><style>.spinner_7uc5{animation:spinner_3l8F .9s linear infinite;animation-delay:-.9s}.spinner_RibN{animation-delay:-.7s}.spinner_ZAxd{animation-delay:-.5s}@keyframes spinner_3l8F{0%,66.66%{animation-timing-function:cubic-bezier(0.14,.73,.34,1);y:6px;height:12px}33.33%{animation-timing-function:cubic-bezier(0.65,.26,.82,.45);y:1px;height:22px}}</style><rect class="spinner_7uc5 spinner_ZAxd" x="1" y="6" width="2.8" height="12"/><rect class="spinner_7uc5 spinner_RibN" x="5.8" y="6" width="2.8" height="12"/><rect class="spinner_7uc5" x="10.6" y="6" width="2.8" height="12"/><rect class="spinner_7uc5 spinner_RibN" x="15.4" y="6" width="2.8" height="12"/><rect class="spinner_7uc5 spinner_ZAxd" x="20.2" y="6" width="2.8" height="12"/></svg>
`;

/** @jsxImportSource @emotion/react */
import React from 'react';
import { SellerStream } from '../../_libs/components/meeting/SellerStream';
import colors from '../../_libs/design/colors';
import { useAlert } from '../../_libs/hooks/useAlert';
import { MainBox } from './MainBox';

export function Main() {
  const { Alert, alertTrigger } = useAlert('ㅋㅋㅋ', 'error');
  return (
    <div
      css={{
        backgroundColor: colors.backgroundLight,
        minHeight: '100vh',
      }}
    >
      <button onClick={alertTrigger}>Trigger Success Alert</button>
      <div>{Alert}</div>
      <MainBox />
    </div>
  );
}

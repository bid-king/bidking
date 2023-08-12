/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { HTMLAttributes } from 'react';

import { ConfirmButton } from '../../common/ConfirmButton';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  liveStatus: string;
}
export function BidCtrl({ liveStatus = '상태' }: Props) {
  return <ConfirmButton label={'다음 아이템 시작'} onClick={() => alert('API')} />;
}

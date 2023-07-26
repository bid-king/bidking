/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { HTMLAttributes } from 'react';

import { ConfirmButton } from '../common/ConfirmButton';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  status: string;
}
export function BidCtrl({ status = '상태' }: Props) {
  return <ConfirmButton label={status} onClick={() => alert('API')} />;
}

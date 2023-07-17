/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../design/colors';

interface Props {
  type: 'text' | 'password' | 'email';
  placeholder: string;
}

export function Input({
  type = 'text',
  placeholder = 'placeholder를 입력하세요',
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
    />
  );
}

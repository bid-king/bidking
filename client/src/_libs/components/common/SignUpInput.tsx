/** @jsxImportSource @emotion/react */
import React, { ChangeEvent } from 'react';
import { HTMLAttributes } from 'react';
import { Text } from './Text';
import { Spacing } from './Spacing';
import { Input } from './Input';

interface Props {
  className: string;
  inputTitle: string;
  inputId: string;
  inputPlaceholder?: string;
  inputType?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SignUpInput({
  className = 'email',
  inputTitle = '이메일을 입력해주세요',
  inputId = 'email-signup-input',
  inputPlaceholder = '',
  inputType = 'text',
  onChange,
}: Props) {
  return (
    <>
      <div className={className}>
        <label htmlFor={inputId}>
          <Text type="bold" content={inputTitle} />
        </label>
        <Spacing rem="1" />
        <Input id={inputId} onChange={onChange} placeholder={inputPlaceholder} inputType={inputType} />
      </div>
      <Spacing rem="2" />
    </>
  );
}

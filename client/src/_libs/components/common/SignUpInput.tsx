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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function SignUpInput({
  className = 'email',
  inputTitle = '이메일을 입력해주세요',
  inputId = 'email-signup-input',
  inputPlaceholder = '',
  inputType = 'text',
  onChange,
  onBlur,
}: Props) {
  return (
    <>
      <div className={className}>
        <label htmlFor={inputId}>
          <Text type="bold" content={inputTitle} />
        </label>
        <Spacing rem="1" />
        <Input id={inputId} onChange={onChange} onBlur={onBlur} placeholder={inputPlaceholder} inputType={inputType} />
      </div>
      <Spacing rem="2" />
    </>
  );
}

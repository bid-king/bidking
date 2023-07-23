/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { HTMLAttributes } from 'react';
import { Text } from './Text';
import colors from '../../design/colors';
import { Spacing } from './Spacing';
import { Input } from './Input';
import { ConfirmButton } from './ConfirmButton';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function LoginBox() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        width: '50rem',
        borderRadius: '0.5rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.backgroundLight,
      }}
    >
      <Text type="h2" content="로그인" />
      <Spacing rem="2" />
      <div
        css={{
          padding: '0.5rem',
        }}
      >
        <div className="email">
          <label htmlFor="email-input">
            <Text type="bold" content="이메일" />
          </label>
          <Spacing rem="1" />
          <Input id="email-input" placeholder="" inputType="email" value={email} onChange={handleEmailChange} />
        </div>
        <Spacing rem="2" />
        <div className="password">
          <label htmlFor="password-input">
            <Text type="bold" content="비밀번호" />
          </label>
          <Spacing rem="1" />
          <Input
            id="password-input"
            placeholder=""
            shape="square"
            inputType="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Spacing rem="2" />
        <ConfirmButton type="submit" label="로그인" />
        <Spacing rem="2" />
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text type="p" content="아이디/비밀번호 찾기" />
          <Text type="bold" content="아직 가입하지 않았어요" />
        </div>
      </div>
    </form>
  );
}

/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../_libs/design/colors';
import { Link } from 'react-router-dom';
import { Text } from '../../_libs/components/common/Text';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Input } from '../../_libs/components/common/Input';
import { ConfirmButton } from '../../_libs/components/common/ConfirmButton';
import { useLogin } from '../../_libs/hooks/useLogin';

// interface Props extends HTMLAttributes<HTMLDivElement> {}

export function LoginBox() {
  const {
    userId,
    password,
    handleUserIdChange,
    handlePasswordChange,
    handleSubmit,
    errorMessage,
    isErrorOccured,
    idRef,
  } = useLogin();

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
        <div className="userId">
          <label htmlFor="userId-input">
            <Text type="bold" content="아이디" />
          </label>
          <Spacing rem="1" />
          <Input
            id="userId-input"
            placeholder=""
            inputType="userId"
            value={userId}
            onChange={handleUserIdChange}
            ref={idRef}
          />
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
        {isErrorOccured && (
          <>
            <Text type="bold" content={errorMessage} />
            <Spacing rem="1" />
          </>
        )}
        <ConfirmButton label="로그인" type="submit" onClick={handleSubmit} />
        <Spacing rem="2" />
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text type="p" content="아이디/비밀번호 찾기" />
          <Link to={'/signup'}>
            <Text type="bold" content="아직 가입하지 않았어요" />
          </Link>
        </div>
      </div>
    </form>
  );
}

/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoundButton } from '../../_libs/components/common/RoundButton';
import { Spacing } from '../../_libs/components/common/Spacing';
import { Spinner } from '../../_libs/components/common/Spinner';
import { Text } from '../../_libs/components/common/Text';
import colors from '../../_libs/design/colors';

export function OrderExit() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/'), 2000);
  }, []);
  return (
    <div
      css={{
        backgroundColor: colors.backgroundLight,
        color: colors.black,
        width: '100%',
        height: 'calc(100vh - 3rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
      <Spacing rem="2" />
      <Text content={'경매가 종료되었어요. 잠시 후 메인 페이지로 이동해요.'} type={'h2'} />
      <Spacing rem="1" />
      <Text content={'메인 페이지로 이동되지 않으면, 아래 버튼을 클릭하세요.'} />
      <Spacing rem="1" />
      <RoundButton onClick={() => navigate('/')} label="메인 페이지로 이동하기" />
    </div>
  );
}

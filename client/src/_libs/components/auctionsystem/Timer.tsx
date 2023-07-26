/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
}
export function Timer({ theme = 'light' }: Props) {
  useEffect(() => {}, []);
  return (
    <div
      css={{
        // border: '1px solid black',
        textAlign: 'center',
        ...THEME_VARIANT[theme],
      }}
    >
      <div css={{}}>
        <Text content="남은 시간" />
        <Text type="h2" content={10 + '초'} />
      </div>
      <Spacing rem="0.5" />
      <div
        css={{
          height: '0.35rem',
          backgroundColor: theme === 'light' ? colors.backgroundLight3 : colors.backgroundDark3,
          borderRadius: '1rem',
        }}
      >
        <div
          css={{
            width: '0%', //시간에 따른 동적 바인딩
            height: '0.35rem',
            borderRadius: '1rem',
            backgroundColor: colors.ok, //시간에 따른 동적 바인딩
            transition: 'width 10s ease-out',
          }}
        />
      </div>
    </div>
  );
}
const THEME_VARIANT = {
  light: {
    color: colors.black,
  },
  dark: {
    color: colors.white,
    backgroundColor: colors.backgroundDark2,
  },
};

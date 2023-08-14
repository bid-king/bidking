/** @jsxImportSource @emotion/react */
import React from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../../design/colors';
import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';

export function Timer({ theme = 'light', time }: Props) {
  return (
    <div
      css={{
        // border: '1px solid black',
        textAlign: 'center',
        ...THEME_VARIANT[theme],
      }}
    >
      <Text type="bold" content={`남은 시간 ${time + '초'}`} />
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
            width: '100%', //시간에 따른 동적 바인딩
            transform: `scaleX(${time > 0 ? (time - 1) / 10 : 0})`,
            transformOrigin: 'left',
            height: '0.35rem',
            borderRadius: '1rem',
            backgroundColor: `${time >= 5 ? colors.ok : time > 2 ? colors.confirm : colors.warn}`, //5초 이상은 초록, 2-4초는 노랑, 0-2초는 빨강
            transition: 'transform 1s linear',
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

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
  time: number;
}

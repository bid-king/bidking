/** @jsxImportSource @emotion/react */
import React, { MutableRefObject, useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';
import { Socket } from 'socket.io-client';
import colors from '../../../design/colors';
import { Spacing } from '../../common/Spacing';
import { Text } from '../../common/Text';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
  socket: MutableRefObject<Socket | null>;
}
export function Timer({ theme = 'light', socket }: Props) {
  const [time, setTime] = useState<number>(10);
  useEffect(() => {
    socket.current?.on('time', data => {
      setTime(data);
    });
  }, [time]);

  return (
    <div
      css={{
        // border: '1px solid black',
        textAlign: 'center',
        ...THEME_VARIANT[theme],
      }}
    >
      <div css={{}}>
        <Text type="bold" content="남은 시간" />
        <Spacing rem="0.25" />
        <Text type="h2" content={time + '초'} />
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
            width: `${10 * time}%`, //시간에 따른 동적 바인딩
            height: '0.35rem',
            borderRadius: '1rem',
            backgroundColor: colors.ok, //시간에 따른 동적 바인딩
            transition: 'width 1s ease-out',
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

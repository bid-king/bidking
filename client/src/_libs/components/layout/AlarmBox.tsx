/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { Text } from '../common/Text';
import { ProfileImage } from '../common/ProfileImage';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { Checkbox } from '../common/Checkbox';
import { Spacing } from '../common/Spacing';

export function AlarmBox({ theme = 'light' }: Props) {
  const id = useAppSelector(state => state.user.id);
  return (
    <div
      css={{
        margin: '1rem',
        borderRadius: '0.5rem',
        padding: '1rem',

        ...THEME_VARIANT[theme],
      }}
    >
      <div
        className="nickName"
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text type="h2" content="알림" />
      </div>
      <Spacing rem="1" />

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text type="bold" content="결제시한이 2일 남았습니다." />
          <Spacing rem="1" dir="h" />
          <Checkbox theme={theme} id="1" value="alarmcheck" />
        </div>
        <Spacing rem="1" />
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text type="bold" content="결제시한이 2일 남았습니다." />
          <Spacing rem="1" dir="h" />
          <Checkbox theme={theme} id="1" value="alarmcheck" />
        </div>
        <Spacing rem="1" />
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text type="bold" content="결제시한이 2일 남았습니다." />
          <Spacing rem="1" dir="h" />
          <Checkbox theme={theme} id="1" value="alarmcheck" />
        </div>
        <Spacing rem="1" />
      </div>
    </div>
  );
}

interface Props {
  theme: 'light' | 'dark';
}

const THEME_VARIANT = {
  light: {
    backgroundColor: colors.backgroundLight2,
    border: `1px solid ${colors.backgroundLight}`,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};

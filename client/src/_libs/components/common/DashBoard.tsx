/** @jsxImportSource @emotion/react */
import React from 'react';
import colors from '../../design/colors';
import { Icon } from './Icon';
import { Text } from './Text';
import { Spacing } from './Spacing';
import dashboardState from '../../constants/dashboardState';

interface Props {
  theme: 'light' | 'dark';
  paymentWaiting?: number;
  deliveryWaiting?: number;
  penalty?: number;
  type?: 'small' | 'big';
}

export function DashBoard({
  theme = 'light',
  paymentWaiting = 0,
  deliveryWaiting = 0,
  penalty = 0,
  type = 'big',
}: Props) {
  const isSmall = type === 'small';
  const textSizeType = isSmall ? 'normal' : 'h3';
  const iconSize = isSmall ? '1.25' : '2';

  return (
    <div
      css={{
        width: isSmall ? undefined : '33vw',
        minWidth: isSmall ? undefined : '27rem',
        justifyContent: isSmall ? undefined : 'space-around',
        flexDirection: isSmall ? 'column' : undefined,
        ...THEME_VARIANTS[theme],
        display: 'flex',
        alignItems: 'center',
        height: isSmall ? undefined : '5rem',
        borderRadius: '1rem',
      }}
    >
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <Icon type="gavel" color="warn" rem={iconSize} />
        <Spacing rem="0.5" dir="h" />
        <Text type={textSizeType} content="결제대기" />
        <Spacing rem="0.5" dir="h" />
        <Text type={textSizeType} content={paymentWaiting.toString()} />
      </div>
      {isSmall && <Spacing rem="0.5" />}
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <Icon type="gavel" color="ok" rem={iconSize} />
        <Spacing rem="0.5" dir="h" />
        <Text type={textSizeType} content={dashboardState.deliveryWaiting} />
        <Spacing rem="0.5" dir="h" />
        <Text type={textSizeType} content={deliveryWaiting.toString()} />
      </div>
      {isSmall && <Spacing rem="0.5" />}
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <Icon type="gavel" color="confirm" rem={iconSize} />
        <Spacing rem="0.5" dir="h" />
        <Text type={textSizeType} content={dashboardState.penalty} />
        <Spacing rem="0.5" dir="h" />
        <Text type={textSizeType} content={penalty.toString()} />
      </div>
    </div>
  );
}

const THEME_VARIANTS = {
  light: {
    backgroundColor: colors.backgroundLight2,
    // border: `1px solid ${colors.backgroundLight}`,
  },
  dark: {
    backgroundColor: colors.backgroundDark2,
    color: colors.white,
  },
};

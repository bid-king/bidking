/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { HTMLAttributes } from 'react';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';
import { Text } from '../common/Text';

interface Props extends HTMLAttributes<HTMLDivElement> {
  theme: 'dark' | 'light';
}
export function TopBidder({ theme = 'light' }: Props) {
  useEffect(() => {}, []);
  return (
    <div
      css={{
        // border: '1px solid black',
        textAlign: 'center',
        ...THEME_VARIANT[theme],
      }}
    >
      <div
        css={
          {
            /* 값 바뀌면 애니메이션 */
          }
        }
      >
        <Text content="최고 입찰" />
        <Text type="h2" content={'이연우'} />
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

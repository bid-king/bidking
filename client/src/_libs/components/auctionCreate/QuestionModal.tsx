/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Icon } from '../common/Icon';
import { Text } from '../common/Text';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';

interface QuestionModalProps {
  content1: string;
  content2: string;
  theme?: 'light' | 'dark';
}

export function QuestionModal({ content1, content2 = '', theme = 'dark' }: QuestionModalProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <Icon color="confirm" type="question" />
      {isHovered && (
        <div
          css={{
            position: 'absolute',
            color: colors.white,
            padding: '10px',
            borderRadius: '5px',
            zIndex: '1',
            width: '500px',
            ...THEME_VARIANTS[theme],
          }}
        >
          <div>
            <Text type="normal" content={content1} />
          </div>
          <Spacing rem="1" />
          <div>
            <Text type="normal" content={content2} />
          </div>
        </div>
      )}
    </div>
  );
}

const THEME_VARIANTS = {
  dark: {
    backgroundColor: colors.backgroundDark3,
  },
  light: {
    backgroundColor: colors.backgroundLight3,
  },
};

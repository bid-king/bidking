/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Icon } from '../common/Icon';
import { Text } from '../common/Text';
import colors from '../../design/colors';
import { Spacing } from '../common/Spacing';

interface QuestionModalProps {
  content1: string;
  content2: string;
}

export function QuestionModal({ content1, content2 = '' }: QuestionModalProps) {
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
            backgroundColor: colors.backgroundDark3,
            color: colors.white,
            padding: '10px',
            borderRadius: '5px',
            zIndex: '1',
            width: '500px',
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

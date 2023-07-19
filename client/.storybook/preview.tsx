/** @jsxImportSource @emotion/react */
import React from 'react';
import { Global, css } from '@emotion/react';
import type { Preview } from '@storybook/react';
import { globalStyle } from '../src/_libs/design/globalStyle';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Global styles={globalStyle} />
        <div css={{ padding: '1rem' }}>
          <div
            css={{
              position: 'absolute',
              width: '430px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Story />
          </div>
        </div>
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

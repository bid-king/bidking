/** @jsxImportSource @emotion/react */
import React from 'react';
import { Global, css } from '@emotion/react';
import type { Preview } from '@storybook/react';
import { globalStyle } from '../src/_libs/design/globalStyle';
import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <BrowserRouter>
          <Global styles={globalStyle} />
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
        </BrowserRouter>
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

import type { Meta, StoryObj } from '@storybook/react';

import { KakaoButton } from './KakaoButton';

const meta = {
  title: 'Common/KakaoButton',
  component: KakaoButton,
  argTypes: {},
} satisfies Meta<typeof KakaoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

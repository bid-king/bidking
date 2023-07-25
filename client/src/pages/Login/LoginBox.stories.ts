import type { Meta, StoryObj } from '@storybook/react';

import { LoginBox } from './LoginBox';

const meta = {
  title: 'Common/LoginBox',
  component: LoginBox,
  argTypes: {},
} satisfies Meta<typeof LoginBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

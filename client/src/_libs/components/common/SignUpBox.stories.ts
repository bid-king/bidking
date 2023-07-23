import type { Meta, StoryObj } from '@storybook/react';

import { SignUpBox } from './SignUpBox';

const meta = {
  title: 'Common/SignUpBox',
  component: SignUpBox,
  argTypes: {},
} satisfies Meta<typeof SignUpBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

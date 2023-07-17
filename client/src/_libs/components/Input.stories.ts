import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'light',
    shape: 'square',
    inputType: 'text',
    placeholder: '안녕?',
  },
};

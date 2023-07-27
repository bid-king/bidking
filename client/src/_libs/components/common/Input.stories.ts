import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
  title: 'Common/Input',
  component: Input,
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: '1',
    theme: 'light',
    shape: 'square',
    inputType: 'text',
    placeholder: '안녕?',
  },
};

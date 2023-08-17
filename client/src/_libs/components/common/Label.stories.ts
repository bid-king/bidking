import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

const meta = {
  title: 'Common/Label',
  component: Label,
  argTypes: {},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'light',
    htmlFor: 'id',
    value: '나는 인풋 라벨이야',
    display: 'inline',
  },
};

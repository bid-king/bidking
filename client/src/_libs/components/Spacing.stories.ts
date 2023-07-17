import type { Meta, StoryObj } from '@storybook/react';

import { Spacing } from './Spacing';

const meta = {
  title: 'Components/Spacing',
  component: Spacing,
  argTypes: {},
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    spacing: 1,
  },
};

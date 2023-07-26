import type { Meta, StoryObj } from '@storybook/react';

import { NavBarModal } from './NavBarModal';

const meta = {
  title: 'Layout/NavBarModal',
  component: NavBarModal,
  argTypes: {},
} satisfies Meta<typeof NavBarModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

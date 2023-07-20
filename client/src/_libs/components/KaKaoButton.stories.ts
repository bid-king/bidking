import type { Meta, StoryObj } from '@storybook/react';

import { KaKaoButton } from './KaKaoButton';

const meta = {
  title: 'Components/KaKaoButton',
  component: KaKaoButton,
  argTypes: {},
} satisfies Meta<typeof KaKaoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

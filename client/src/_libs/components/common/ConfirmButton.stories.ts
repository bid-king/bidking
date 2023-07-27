import type { Meta, StoryObj } from '@storybook/react';

import { ConfirmButton } from './ConfirmButton';

const meta = {
  title: 'Common/ConfirmButton',
  component: ConfirmButton,
  argTypes: {},
} satisfies Meta<typeof ConfirmButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: '안녕?',
    btnType: 'ok',
    activated: 1,
    type: 'button',
  },
};

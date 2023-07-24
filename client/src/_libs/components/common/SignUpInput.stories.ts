import type { Meta, StoryObj } from '@storybook/react';

import { SignUpInput } from './SignUpInput';

const meta = {
  title: 'Common/SignUpInput',
  component: SignUpInput,
  argTypes: {},
} satisfies Meta<typeof SignUpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: 'email',
    inputTitle: '이메일을 입력해주세요',
    inputId: 'email-signup-input',
    inputPlaceholder: '',
  },
};

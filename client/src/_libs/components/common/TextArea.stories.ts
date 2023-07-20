import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta = {
  title: 'Common/TextArea',
  component: TextArea,
  argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'light',
    placeholder: '안녕 나는 텍스트 에어리어야',
  },
};

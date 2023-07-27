import type { Meta, StoryObj } from '@storybook/react';
import { ProfileImage } from './ProfileImage';

const meta = {
  title: 'Common/ProfileImage',
  component: ProfileImage,
  argTypes: {},
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: '/image/profile.png',
    rem: 2,
  },
};

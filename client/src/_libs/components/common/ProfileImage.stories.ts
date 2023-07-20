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
    imgSrc: '/image/profile.png',
    myWidth: '3.375rem',
    myHeight: '3.375rem',
  },
};

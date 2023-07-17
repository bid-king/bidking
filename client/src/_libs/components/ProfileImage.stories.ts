import type { Meta, StoryObj } from '@storybook/react';
import { ProfileImage } from './ProfileImage';
import profileImg from '../static/profile.png';

const meta = {
  title: 'Components/ProfileImage',
  component: ProfileImage,
  argTypes: {},
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgSrc: `${profileImg}`,
    myWidth: '3.375rem',
    myHeight: '3.375rem',
  },
};

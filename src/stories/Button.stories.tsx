import type { Meta, StoryObj } from '@storybook/react';

import Button from 'components/button';
import { SearchIcon } from '@/assets/icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Buttons',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // For default args value for all component use the below one
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {

  // }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Button',
  },
};
export const PrimaryLeftIcon: Story = {
  args: {
    label: 'Button',
    leftIcon: <SearchIcon />,
    disabled: false,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    label: 'Button',
    disabled: true,
  },
};
export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};
export const SecondaryLeftIcon: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    leftIcon: <SearchIcon />,
    disabled: false,
  },
};
export const SecondaryDisabled: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '@/components/dropdown';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    placeholder: { type: 'string' },
    options: { control: 'object' },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    placeholder: 'Dropdown',
    options: [
      {
        id: 1,
        text: 'Alert Data',
      },
      {
        id: 2,
        text: 'Warn Data',
      },
    ],
    type: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    placeholder: 'Dropdown',
    options: [
      {
        id: 1,
        text: 'Alert Data',
      },
      {
        id: 2,
        text: 'Warn Data',
      },
    ],
    type: 'secondary',
  },
};

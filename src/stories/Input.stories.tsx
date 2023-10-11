import { Input } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {

  // }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    placeholder: 'Enter Username',
    className: 'py-7 pl-7 border border-grey-dark text-grey-light h-[40px]',
  },
};

export const Secondary: Story = {
  args: {
    placeholder: 'Enter Machine name',
    label: 'Machine Name',
    labelClassName: 'text-[#492CE1] text-[14px] font-medium block mb-2',
    className: 'py-7 pl-7 border border-grey-dark text-grey-light h-[40px]',
  },
};

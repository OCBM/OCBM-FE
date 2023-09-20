import type { Meta, StoryObj } from '@storybook/react';

import Modal from '@/components/modal';
import { ChevronSuccessIcon } from '@/assets/icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {

  // }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    children: (
      <div className=" text-center w-[280px]">
        <div className="flex justify-center mb-3">
          <ChevronSuccessIcon />
        </div>
        <h2 className="mb-4 font-medium text-[24px]">File Uploaded successfully</h2>
        <button className="text-center bg-blue-500 px-5 py-2 rounded-[20px] text-white">
          Done
        </button>
      </div>
    ),
    isOpen: true,
  },
};

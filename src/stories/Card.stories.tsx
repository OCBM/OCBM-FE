import type { Meta, StoryObj } from '@storybook/react';

import Card from '@/components/card';
import Image from '@/components/Image';
import Chennai from './images/chennai.jpg';
import Machine from './images/machine.png';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    className: { type: 'string' },
    tag: { type: 'string' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CardWithPlant: Story = {
  args: {
    children: (
      <div className="text-center w-[250px] h-auto rounded-[15px] bg-white shadow-[0px_0px_40px_0px_#0000001A] p-4">
        <Image className="mx-auto" src={Chennai} alt="Planet Images" />
        <h2 className="text-[18px] font-medium text-black mt-3">Chennai</h2>
      </div>
    ),
  },
};

export const CardWithSensor: Story = {
  args: {
    children: (
      <div className="text-center w-[244px] h-auto rounded-[16px] border-[#19C18F66] border-2   pt-4">
        <h2 className="text-[18px] font-bold text-black px-5 mb-4">
          Oil Temperature at Cooloer Outlet Line
        </h2>
        <Image className="mx-auto mb-4" src={Machine} alt="Planet Images" />
        <button className="bg-[#605BFF] text-white text-[16px] text-center w-full py-3 font-bold rounded-b-[16px]">
          View
        </button>
      </div>
    ),
  },
};
export const CardWithTag: Story = {
  args: {
    children: (
      <div className="text-center w-[244px] h-auto rounded-[15px] bg-white shadow-[0px_0px_40px_0px_#0000001A] pt-4">
        <h2 className="text-[18px] font-bold text-black px-5 mb-4">
          Oil Temperature at Cooloer Outlet Line
        </h2>
        <Image className="mx-auto mb-4" src={Machine} alt="Planet Images" />
        <button className="bg-[#605BFF] text-white text-[16px] text-center w-full py-3 font-bold rounded-b-[16px]">
          View
        </button>
      </div>
    ),
    tag: 'high',
  },
};

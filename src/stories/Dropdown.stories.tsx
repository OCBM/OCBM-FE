import { useState } from 'react';
import { Dropdown } from '@/components';
import type { Meta } from '@storybook/react';

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

const dropdownOptions = [
  {
    id: 1,
    text: 'Alert Data',
  },
  {
    id: 2,
    text: 'Warn Data',
  },
];

const PrimaryDropdown = () => {
  const [state, setState] = useState('');

  return (
    <Dropdown
      type="primary"
      value={state}
      options={dropdownOptions}
      placeholder="Dropdown"
      optionLabel="text"
      handleChange={(val) => setState(val)}
    />
  );
};
const SecondaryDropdown = () => {
  const [state, setState] = useState('');

  return (
    <Dropdown
      type="secondary"
      value={state}
      options={dropdownOptions}
      placeholder="Dropdown"
      optionLabel="text"
      handleChange={(val) => setState(val)}
    />
  );
};
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  render: () => <PrimaryDropdown />,
};

export const Secondary = {
  render: () => <SecondaryDropdown />,
};

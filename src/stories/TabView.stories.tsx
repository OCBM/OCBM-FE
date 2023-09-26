import type { Meta, StoryObj } from '@storybook/react';
import TabView from 'components/tabview';

const primaryTabs = [
  { title: 'Plant', key: 'plant', content: 'content' },
  { title: 'Shop', key: 'shop', content: 'content' },
];
const secondaryTabs = [
  { title: 'Machines', key: 'machines', path: '/machines' },
  { title: 'Sensors', key: 'sensors', path: '/sensors' },
];

const meta = {
  title: 'components/TabView',
  component: TabView,

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tabs: primaryTabs,
    type: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    tabs: secondaryTabs,
    type: 'secondary',
  },
};

import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { TabView } from '@/components';

const primaryTabs = [
  { title: 'Plant', key: 'plant', content: 'plant' },
  { title: 'Shop', key: 'shop', content: 'shop' },
];
const secondaryTabs = [
  { title: 'Machines', key: 'machines', content: 'machine' },
  { title: 'Sensors', key: 'sensors', content: 'sensors' },
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

const TabViewPrimary = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return <TabView type="primary" tabs={primaryTabs} activeIndex={activeIndex} handleClick={handleClick} />;
};

const TabViewSecondary = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return <TabView type="secondary" tabs={secondaryTabs} activeIndex={activeIndex} handleClick={handleClick} />;
};

export const Primary = {
  render: () => <TabViewPrimary />,
};

export const Secondary = {
  render: () => <TabViewSecondary />,
};

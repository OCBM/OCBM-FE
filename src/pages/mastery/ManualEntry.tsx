import { useState } from 'react';
import TabViewPrimary from '@/components/reusable/tabview/TabViewPrimary';
import Shop from './Shop';
import MachineLine from './MachineLine';
import Machine from './Machine';
import Plant from './Plant';
import Element from './Element';
import Sensor from './Sensor';

const ManualEntry = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: 'Business Unit',
      content: <Plant />,
      key: 'plant',
    },
    {
      title: 'Manufacturing Location',
      content: <Shop />,
      key: 'shop',
    },
    {
      title: 'Manufacturing Line',
      content: <MachineLine />,
      key: 'machine line',
    },
    {
      title: 'Machine',
      content: <Machine />,
      key: 'machine',
    },
    {
      title: 'Element / Subsystem',
      content: <Element />,
      key: 'element',
    },
    {
      title: 'Sensor',
      content: <Sensor />,
      key: 'sensor',
    },
  ];

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <TabViewPrimary type="primary" tabs={tabs} activeIndex={activeIndex} handleClick={handleClick} />
    </>
  );
};

export default ManualEntry;

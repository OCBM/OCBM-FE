import TabViewSecondary from '@/components/reusable/tabview/TabViewSecondary';
import MachinesPage from './machines';
import SensorPage from './sensor';
import { useState } from 'react';
//import { OutOfSpec, Thresholdlimit, WithinSpec } from '@/assets/icons';

const Machines = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {
      title: 'Machines',
      content: <MachinesPage />,
      key: 'machines',
    },
    {
      title: 'Sensors',
      content: <SensorPage />,
      key: 'sensor',
    },
  ];
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="rounded-lg shadow-md p-5 relative">
      <div className="flex gap-1 right-4 mt-1 absolute">
        {/* <span className="flex text-sm w-[100px] items-center h-[20px] gap-2">
          <OutOfSpec />
          Out of spec
        </span>
        <span className="flex text-sm w-[120px] items-center h-[20px] gap-2">
          <Thresholdlimit />
          Threshold limit
        </span>
        <span className="flex text-sm w-[120px] items-center h-[20px] gap-2">
          <WithinSpec />
          Within Spec
        </span> */}
      </div>
      <div className="flex">
        <TabViewSecondary type="secondary" tabs={tabs} activeIndex={activeIndex} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Machines;

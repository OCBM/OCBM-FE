import { BulkUploadIcon, ManualEntryIcon } from '@/assets/icons';
import TabViewPrimary from '@/components/reusable/tabview/TabViewPrimary';
import { useState } from 'react';
import Shop from './Shop';
import MachineLine from './MachineLine';
import Machine from './Machine';
import Plant from './Plant';
import Element from './Element';

const Mastery = () => {
  const [showTab, setShowTab] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: 'Plant',
      content: <Plant />,
      key: 'plant',
    },
    {
      title: 'Shop',
      content: <Shop />,
      key: 'shop',
    },
    {
      title: 'Machine Line',
      content: <MachineLine />,
      key: 'machine line',
    },
    {
      title: 'Machine',
      content: <Machine />,
      key: 'machine',
    },
    {
      title: 'Element',
      content: <Element />,
      key: 'element',
    },
    {
      title: 'Sensor',
      content: 'Add Sensor',
      key: 'sensor',
    },
  ];

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      {!showTab ? (
        // home page of mastery
        <div className="flex justify-center items-center flex-grow">
          <div className="flex gap-6 items-center justify-center">
            {/* Block upload section */}
            <div className="flex flex-col gap-5 items-center justify-center px-16 py-12 rounded-2xl cursor-pointer shadow-[0_0_6px_2px_rgba(0,0,0,0.08)]">
              <BulkUploadIcon />
              <p className="text-[#605BFF] text-[18px] font-medium leading-[18px]">Bulk Upload</p>
            </div>
            {/* Manual Entry Section */}
            <div
              className="flex flex-col gap-5 items-center justify-center px-16 py-12 rounded-2xl cursor-pointer shadow-[0_0_6px_2px_rgba(0,0,0,0.08)]"
              onClick={() => setShowTab(true)}
            >
              <ManualEntryIcon />
              <p className="text-[#605BFF] text-[18px] font-medium leading-[18px]">Manual Entry</p>
            </div>
          </div>
        </div>
      ) : (
        // tab view of mastery page
        <div className="">
          <TabViewPrimary type="primary" tabs={tabs} activeIndex={activeIndex} handleClick={handleClick} />
        </div>
      )}
    </>
  );
};

export default Mastery;

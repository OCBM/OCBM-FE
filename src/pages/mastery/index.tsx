import { BulkUploadIcon, ManualEntryIcon } from '@/assets/icons';
import TabViewPrimary from '@/components/reusable/tabview/TabViewPrimary';
import { useState } from 'react';
import Shop from './Shop';

const Mastery = () => {
  const [showTab, setShowTab] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: 'Plant',
      content: 'Add plant',
      key: 'plant',
    },
    {
      title: 'Shop',
      content: <Shop />,
      key: 'shop',
    },
    {
      title: 'Machine Line',
      content: 'Add Machine Line',
      key: 'machine line',
    },
    {
      title: 'Machine',
      content: 'Add Machine',
      key: 'machine',
    },
    {
      title: 'Element',
      content: 'Add Element',
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
        <div className="flex justify-center items-center h-[80%]">
          <div className="flex gap-6 items-center justify-center">
            <div className="flex flex-col gap-5 items-center justify-center px-16 py-12 rounded-2xl cursor-pointer shadow-[0_0_6px_2px_rgba(0,0,0,0.08)]">
              <BulkUploadIcon />
              <p className="text-[#605BFF] text-[18px] font-medium leading-[18px]">Bulk Upload</p>
            </div>
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

import { useState } from 'react';
import { TabViewPropsType } from './types';
import { TabType } from './types';

const TabView = ({ tabs, className }: TabViewPropsType) => {
  const [active, setActive] = useState<number>(0);

  const activeStyle = 'bg-[#605BFF] text-white rounded-t-lg';
  const inactiveStyle = 'bg-[#F4F3FE] text-[#605BFF]';

  return (
    <div
      className={`w-full h-full rounded-t-lg shadow-[0_4px_10px_-4px_rgba(0,0,0,0.10)] ${className}`}
    >
      <div className="flex bg-[#F4F3FE] whitespace-nowrap overflow-x-auto w-fit ">
        {tabs?.map((tab: TabType, index: number) => (
          <div
            className={`${index === active ? activeStyle : inactiveStyle} font-medium py-4 px-20`}
            onClick={() => setActive(index)}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      <div className="p-12">{tabs?.[active]?.content}</div>
    </div>
  );
};

export default TabView;

TabView.defaultProps = {
  tabs: [
    {
      title: 'Plant',
      content: 'Add Plant',
    },
    {
      title: 'Shop',
      content: 'Add Shop',
    },
  ],
  className: '',
};

import { useState } from 'react';
import { TabViewPropsType } from './types';

const TabView = ({ tabs }: TabViewPropsType) => {
  const [active, setActive] = useState<number>(0);

  const activeStyle = 'bg-[#605BFF] text-white rounded-t-lg';
  const inactiveStyle = 'bg-[#F4F3FE] text-[#605BFF]';

  return (
    <div className="w-full h-full rounded-t-lg">
      <div className="flex bg-[#F4F3FE] whitespace-nowrap overflow-x-auto">
        {tabs?.map((tab, index) => (
          <div
            className={`${index === active ? activeStyle : inactiveStyle} font-medium py-4 px-20`}
            onClick={() => setActive(index)}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      <div className="p-12">{tabs[active]?.content}</div>
    </div>
  );
};

export default TabView;

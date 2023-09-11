import { useState } from 'react';
import { TabViewPropsType } from './types';
import { TabType } from './types';

const TabViewPrimary = ({ tabs, className }: TabViewPropsType) => {
  const [active, setActive] = useState<number>(0);
  const primaryActiveStyle = 'bg-[#605BFF] text-white rounded-t-lg';
  const primaryInactiveStyle = 'bg-[#F4F3FE] text-[#605BFF]';

  return (
    <div
      className={`${className} w-full h-full rounded-t-lg shadow-[0_4px_10px_-4px_rgba(0,0,0,0.10)]`}
    >
      <div className="flex whitespace-nowrap overflow-x-auto w-fit bg-[#F4F3FE]">
        {tabs?.map((tab: TabType, index: number) => (
          <div
            key={tab.key}
            className={`cursor-pointer tracking-[0.36px] leading-[18px] text-lg
                  ${` ${
                    index === active ? primaryActiveStyle : primaryInactiveStyle
                  } font-medium py-4 px-20`}
                `}
            onClick={() => {
              setActive(index);
            }}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      <div className="p-12">{tabs?.[active]?.content}</div>
    </div>
  );
};

export default TabViewPrimary;

TabViewPrimary.defaultProps = {
  tabs: [
    {
      title: 'Plant',
      content: 'Add Plant',
      key: 'plant',
    },
    {
      title: 'Shop',
      content: 'Add Shop',
      key: 'shop',
    },
  ],
  className: '',
};

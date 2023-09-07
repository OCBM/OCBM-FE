import { useState } from 'react';
import { TabViewPropsType } from './types';
import { TabType } from './types';

const TabView = ({ tabs, className, type }: TabViewPropsType) => {
  const [active, setActive] = useState<number>(0);

  const primaryActiveStyle = 'bg-[#605BFF] text-white rounded-t-lg';
  const primaryInactiveStyle = 'bg-[#F4F3FE] text-[#605BFF]';

  const secondaryActiveStyle =
    'text-[#492CE1] font-medium border-solid border-b-2 border-[#492CE1]';
  const secondaryInactiveStyle = 'text-[#444444] font-normal';

  return (
    <div
      className={` w-full h-full ${
        type === 'primary' ? 'rounded-t-lg shadow-[0_4px_10px_-4px_rgba(0,0,0,0.10)]' : ''
      }  ${className}`}
    >
      <div
        className={`flex whitespace-nowrap overflow-x-auto w-fit ${
          type === 'primary' ? 'bg-[#F4F3FE]' : 'gap-[10px]'
        }`}
      >
        {tabs?.map((tab: TabType, index: number) => (
          <div
            className={`cursor-pointer tracking-[0.36px] leading-[18px] text-lg
                  ${
                    type === 'primary'
                      ? ` ${
                          index === active ? primaryActiveStyle : primaryInactiveStyle
                        } font-medium py-4 px-20`
                      : `p-[10px] ${
                          index === active ? secondaryActiveStyle : secondaryInactiveStyle
                        }`
                  }
                `}
            onClick={() => setActive(index)}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      <div className={` ${type === 'primary' ? 'p-12' : 'py-5'}`}>{tabs?.[active]?.content}</div>
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
  type: 'secondary',
};

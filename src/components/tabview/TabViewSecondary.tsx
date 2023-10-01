import { TabViewPropsType } from './types';
import { TabType } from './types';
import { Outlet } from 'react-router-dom';

const TabViewSecondary = ({ tabs = [], className = '', handleClick = () => {}, activeIndex = 0 }: TabViewPropsType) => {
  const secondaryActiveStyle = 'text-[#492CE1] font-medium border-solid border-b-2 border-[#492CE1]';
  const secondaryInactiveStyle = 'text-[#444444] font-normal';

  return (
    <div className={`w-full h-full ${className}`}>
      <div className="flex whitespace-nowrap overflow-x-auto w-fit gap-[10px]">
        {tabs?.map((tab: TabType, index: number) => (
          <div
            key={tab.key}
            className={`cursor-pointer tracking-[0.36px] leading-[18px] text-lg
                  ${`p-[10px] ${index === activeIndex ? secondaryActiveStyle : secondaryInactiveStyle}`}
                `}
            onClick={() => {
              handleClick(index, tab?.path);
            }}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      {tabs[activeIndex]?.path ? <Outlet /> : <div className="py-5">{tabs?.[activeIndex]?.content}</div>}
    </div>
  );
};

export default TabViewSecondary;

import { useState } from 'react';
import { TabViewPropsType } from './types';
import { TabType } from './types';
import { Outlet, useNavigate } from 'react-router-dom';

const TabViewSecondary = ({ tabs = [], className = '' }: TabViewPropsType) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);

  const secondaryActiveStyle =
    'text-[#492CE1] font-medium border-solid border-b-2 border-[#492CE1]';
  const secondaryInactiveStyle = 'text-[#444444] font-normal';

  return (
    <div className={`w-full h-full ${className}`}>
      <div className="flex whitespace-nowrap overflow-x-auto w-fit gap-[10px]">
        {tabs?.map((tab: TabType, index: number) => (
          <div
            key={tab.key}
            className={`cursor-pointer tracking-[0.36px] leading-[18px] text-lg
                  ${`p-[10px] ${index === active ? secondaryActiveStyle : secondaryInactiveStyle}`}
                `}
            onClick={() => {
              if (tab?.path) {
                navigate(tab?.path);
              }
              setActive(index);
            }}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default TabViewSecondary;

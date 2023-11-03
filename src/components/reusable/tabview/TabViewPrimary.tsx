import { TabViewPropsType } from './types';
import { TabType } from './types';

const TabViewPrimary = ({ tabs = [], className = '', handleClick = () => {}, activeIndex }: TabViewPropsType) => {
  const primaryActiveStyle = 'bg-[#605BFF] text-white rounded-t-lg';
  const primaryInactiveStyle = 'bg-[#F4F3FE] text-[#605BFF]';

  return (
    <div className={`${className} w-full h-full rounded-t-lg shadow-[0_4px_10px_-4px_rgba(0,0,0,0.10)]`}>
      <div className="flex whitespace-nowrap overflow-x-auto bg-[#F4F3FE] mb-5">
        {tabs?.map((tab: TabType, index: number) => (
          <div
            key={tab.key}
            className={`cursor-pointer tracking-[0.36px] leading-[18px] text-lg w-[17%] text-center font-medium py-4
                   ${index === activeIndex ? primaryActiveStyle : primaryInactiveStyle}`}
            onClick={() => {
              handleClick(index);
            }}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      <div className="p-12 max-h-[445px] overflow-auto">{tabs?.[activeIndex]?.content}</div>
    </div>
  );
};

export default TabViewPrimary;

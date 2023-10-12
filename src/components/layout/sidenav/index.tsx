import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { OmnexIcon } from '@/assets/icons';
import { sideNavRoutes } from './routes';
import { SITEMAP } from '@/utils/sitemap';

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(SITEMAP.plant.index);
  const navigate = useNavigate();

  return (
    <div className="bg-[#605BFF] rounded-2xl flex flex-col items-center px-5 py-[50px]">
      <div
        className="p-[10px] mb-10 cursor-pointer"
        onClick={() => {
          setActiveIndex(SITEMAP.plant.index);
          navigate(SITEMAP.plant.index);
        }}
      >
        <OmnexIcon />
      </div>
      <div className="flex flex-col justify-center items-center gap-[10px] overflow-y-auto">
        {sideNavRoutes.map((option) => (
          <div
            key={option.key}
            className={`flex flex-col justify-center items-center rounded-2xl w-[92px] h-[92px] cursor-pointer ${
              activeIndex === option.key ? 'bg-white py-[10px]' : ''
            }`}
            onClick={() => {
              setActiveIndex(option.key);
              navigate(option.path);
            }}
          >
            <option.icon className={`${activeIndex === option.key ? 'fill-[#492CE1]' : 'fill-white'} w-9 h-9`} />
            <p
              className={`text-center font-medium text-[14px] mt-[6px] ${
                activeIndex === option.key ? 'text-[#492CE1]' : 'text-white'
              }`}
            >
              {option.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

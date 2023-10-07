import { useNavigate } from 'react-router-dom';
import {
  AddUserIcon,
  MachineIcon,
  MasteryIcon,
  OmnexIcon,
  PlantIcon,
  ReportsIcon,
  SetStandardIcon,
} from '@/assets/icons';
import { useState } from 'react';

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState('plant');
  const navigate = useNavigate();

  const options = [
    {
      icon: PlantIcon,
      title: 'Plant',
      key: 'plant',
      path: '/plant',
    },
    {
      icon: MachineIcon,
      title: 'Machines',
      key: 'machines',
      path: '/machines',
    },
    {
      icon: MasteryIcon,
      title: 'Mastery',
      key: 'mastery',
      path: '/mastery',
    },
    {
      icon: SetStandardIcon,
      title: 'Set Standards',
      key: 'standard',
      path: '/standard',
    },
    {
      icon: ReportsIcon,
      title: 'Reports',
      key: 'report',
      path: '/reports',
    },
    {
      icon: AddUserIcon,
      title: 'Add user',
      key: 'user',
      path: '/user',
    },
  ];

  return (
    <div className="bg-[#605BFF] rounded-2xl flex flex-col items-center px-5 py-[50px]">
      <div className="p-[10px] mb-10" onClick={() => navigate('/')}>
        <OmnexIcon />
      </div>
      <div className="flex flex-col justify-center items-center gap-[10px] overflow-y-auto">
        {options.map((option) => (
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
            <p className={`text-center font-medium ${activeIndex === option.key ? 'text-[#492CE1]' : 'text-white'}`}>
              {option.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

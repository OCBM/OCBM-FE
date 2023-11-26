import { BreadcrumbsType } from './types';
import { Button } from '@/components';
import { PlusIcon } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';
import { SITEMAP } from '@/utils/sitemap';
import { useLocation } from 'react-router-dom';
function Breadcrumbs({ className, crumbs }: BreadcrumbsType) {
  const location = useLocation();
  const OnAddUserPage = () => {
    navigate(SITEMAP.users.addUser);
  };
  const routerNameChange = (data: string) => {
    switch (data) {
      case 'userDetails':
        return ' User Details';
      case 'addUser':
        return 'add User';
      case 'setStandards':
        return 'set Standards';
      case 'SpindleCoolingSystem':
        return 'Spindle Cooling System';
      case 'hydraulicSystem':
        return 'hydraulic System';
      case 'LubricationSystem':
        return 'Lubrication System';
      case 'manualEntry':
        return 'manual entry';
      default:
        return data;
    }
  };
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex justify-start">
        {crumbs?.map((data) => (
          <div
            key={data}
            className={`${
              className || ''
            } flex pb-2 text-[18px] text-black capitalize last:font-bold last:text-[#492ce1] 
		  after:content-['/'] last:after:content-[''] before:ml-[10px] after:ml-[10px] last:content-['']`}
          >
            {routerNameChange(data)}
          </div>
        ))}
      </div>
      {location.pathname === SITEMAP.users.index ? (
        <div>
          <Button
            leftIcon={<PlusIcon />}
            label="Create"
            className="py-[8px] px-[18px] text-[16px] font-medium"
            variant="primary"
            onClick={OnAddUserPage}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Breadcrumbs;

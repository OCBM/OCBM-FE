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
        return 'set PM Standards';
      case 'SpindleCoolingSystem':
        return 'Spindle Cooling System';
      case 'hydraulicSystem':
        return 'hydraulic System';
      case 'LubricationSystem':
        return 'Lubrication System';
      case 'manualEntry':
        return 'manual entry';
      case 'NewSetStandards':
        return 'New Set PM Standards';
      default:
        return data;
    }
  };
  const navigate = useNavigate();
  const handleNavigate = (data: string) => {
    const index = crumbs?.indexOf(data);
    let path: string | undefined = '';
    if (index !== -1 && index !== undefined) {
      path = crumbs?.slice(0, index + 1).join('/');
    } else {
      path = '/';
    }
    navigate(`/${path}`);
  };
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex justify-start">
        {crumbs?.map((data) => (
          <div
            key={data}
            className={`${
              className || ''
            } flex pb-2 text-[18px] text-black capitalize font-medium last:font-medium last:text-[#492ce1] cursor-pointer 
		        after:content-['/'] last:after:content-[''] before:ml-[10px] after:ml-[10px] last:content-['']`}
            onClick={() => handleNavigate(data)}
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
      {location.pathname === SITEMAP.mastery.manualEntry ? (
        <Button label="Bulk Upload" className="py-[8px] px-[18px] text-[16px] font-medium" variant="primary" disabled />
      ) : null}
    </div>
  );
}

export default Breadcrumbs;

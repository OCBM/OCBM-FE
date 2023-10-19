import { BreadcrumbsType } from './types';
import { Button } from '@/components';
import { PlusIcon } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';
import { SITEMAP } from '@/utils/sitemap';
function Breadcrumbs({ className, crumbs }: BreadcrumbsType) {
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
            className={`${className || ''} flex pb-2 text-[18px] text-black capitalize last:text-[#492ce1] 
		  after:content-['/'] last:after:content-[''] before:ml-[10px] after:ml-[10px] last:content-['']`}
          >
            {routerNameChange(data)}
          </div>
        ))}
      </div>
      {routerNameChange('addUser') === 'add User' ? (
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

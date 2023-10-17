import { BreadcrumbsType } from './types';

function Breadcrumbs({ className, crumbs }: BreadcrumbsType) {
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
  return (
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
  );
}

export default Breadcrumbs;

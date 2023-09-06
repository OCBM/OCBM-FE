import { BreadcrumbsType } from './types';

function Breadcrumbs({ className, crumbs }: BreadcrumbsType) {
  return (
    <div className="border-b-[2px] border-[#44444447] border-solid flex justify-start">
      {crumbs?.map((data) => (
        <div
          className={`${
            className || ''
          } breadcrumb flex pb-2 text-[18px] text-black capitalize last:text-[#492ce1] 
		  after:content-['/'] last:after:content-[''] before:ml-[10px] after:ml-[10px] last:content-['']`}
        >
          {data}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumbs;

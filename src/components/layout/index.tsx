import { Outlet } from 'react-router-dom';
import Header from './header';
import SideNav from './sidenav';
import { Breadcrumbs } from '..';
import { useAppSelector, useBreadcrumbs } from '@/hooks';
import classNames from 'classnames';

export function Layout() {
  const list = useBreadcrumbs();
  const { show } = useAppSelector((state) => state.plantRegistration);
  return (
    <div
      className={`${classNames({
        'bg-black flex h-full w-full overflow-hidden py-[14px] pl-[14px ': show !== 'plant',
      })} flex h-full w-full overflow-hidden py-[14px] pl-[14px]`}
    >
      <SideNav />
      <div className="px-[30px] w-full h-full overflow-y-auto ">
        <Header hideAvatar={show !== 'plant'} hideFilters={show !== 'plant'} />

        {show !== 'shop' && show !== 'machine' && (
          <div className="my-8">
            <Breadcrumbs crumbs={['home', ...list]} />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

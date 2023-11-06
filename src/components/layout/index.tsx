import { Outlet } from 'react-router-dom';
import Header from './header';
import SideNav from './sidenav';
import { Breadcrumbs } from '..';
import { useBreadcrumbs } from '@/hooks';

export function Layout() {
  const list = useBreadcrumbs();
  return (
    <div className="flex h-full w-full overflow-hidden py-[14px] pl-[14px]">
      <SideNav />
      <div className="px-[30px] w-full h-full overflow-y-auto ">
        <Header />
        <div className="my-8">
          <Breadcrumbs crumbs={['home', ...list]} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

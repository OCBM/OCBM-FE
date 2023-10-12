import { Outlet } from 'react-router-dom';
import Header from './header';
import SideNav from './sidenav';
import { Breadcrumbs } from '..';
import { useBreadcrumbs } from '@/hooks';

export function Layout() {
  const list = useBreadcrumbs();
  return (
    <div className="flex h-screen py-[14px] pl-[14px]">
      <SideNav />
      <div className="px-[30px] w-full">
        <Header />
        <Breadcrumbs crumbs={['home', ...list]} />
        <>
          <Outlet />
        </>
      </div>
    </div>
  );
}

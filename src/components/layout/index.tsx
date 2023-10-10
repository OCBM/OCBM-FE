import { Outlet } from 'react-router-dom';
import Header from './header';
import SideNav from './sidenav';
import { Breadcrumbs } from '..';
import { useBreadcrumbs } from '@/hooks';

export function Layout() {
  const list = useBreadcrumbs();
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="p-5 w-screen">
        <Header />
        <Breadcrumbs crumbs={['home', ...list]} />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import Header from './header';
import SideNav from './sidenav';

export function Layout() {
  return (
    <div className="flex h-screen py-[14px] pl-[14px] pr-[35px]">
      <SideNav />
      <div className="px-[30px] w-full">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

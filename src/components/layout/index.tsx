import { Outlet } from 'react-router-dom';
import Header from './header';
import SideNav from './sidenav';

export function Layout() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="p-5 w-screen">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

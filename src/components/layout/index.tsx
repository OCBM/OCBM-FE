import Header from './header';
import SideNav from './sidenav';
import { LayoutPropTypes } from './types';

export default function Layout({ children }: LayoutPropTypes) {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="p-5 w-screen">
        <Header />
        {children}
      </div>
    </div>
  );
}

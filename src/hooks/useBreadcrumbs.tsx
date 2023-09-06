import { useLocation } from 'react-router-dom';

export default function useBreadcrumbs() {
  const location = useLocation();
  const crumbs = location.pathname.split('/').filter((crumbs) => crumbs !== '');
  // .map((crumbs) => {
  //   return (
  //     <div className="" key={crumbs}>
  //       {crumbs}
  //     </div>
  //   );
  // });
  return crumbs;
}

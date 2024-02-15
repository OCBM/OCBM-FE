import { useLocation, useNavigate } from 'react-router-dom';
// import { OmnexIcon } from '@/assets/icons';
import Logo from '@/assets/images/logo.jpg';
import { sideNavRoutes } from './routes';
import { SITEMAP } from '@/utils/sitemap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { accessRules } from '@/utils/accessibilityConstants';

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedUser = useSelector((state: RootState) => state.auth?.user);

  function isRoute(currentRoute: string) {
    return location.pathname.includes(currentRoute);
  }

  return (
    <div className="bg-[#605BFF] rounded-2xl flex flex-col items-center px-5 py-[50px] ">
      <div
        className="p-[10px] mb-10 cursor-pointer"
        onClick={() => {
          navigate(SITEMAP.plant.index);
        }}
      >
        {/* <OmnexIcon /> */}
        <img src={Logo} className="w-28" />
      </div>
      <div className="flex flex-col justify-center items-center gap-[10px] overflow-y-auto hiddenScroll">
        {sideNavRoutes.map((option) => {
          const userAccess = accessRules[loggedUser?.role || 'USER']?.[option.title];

          const hasAccess = userAccess && userAccess.length > 0;

          return hasAccess ? (
            <div
              key={option.key}
              className={`flex flex-col justify-center items-center rounded-2xl w-[92px] h-[92px] cursor-pointer ${
                isRoute(option.key) ? 'bg-white py-[10px]' : ''
              }`}
              onClick={() => {
                navigate(option.path);
              }}
            >
              <option.icon className={`${isRoute(option.key) ? 'fill-[#492CE1]' : 'fill-white'} w-9 h-9`} />
              <p
                className={`text-center font-medium text-[14px] mt-[6px] ${
                  isRoute(option.key) ? 'text-[#492CE1]' : 'text-white'
                }`}
              >
                {option.title}
              </p>
            </div>
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;

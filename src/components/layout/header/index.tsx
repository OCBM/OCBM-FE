import { SearchIcon } from '@/assets/icons';
import { Dropdown, Input } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutUser } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const options = [
    {
      key: 'plants',
      text: 'Plants',
      className: 'w-[57px]',
    },
    {
      text: 'Shop',
      key: 'shop',
      className: 'w-[48px]',
    },
    {
      text: 'Machine Line',
      key: 'machineline',
      className: 'w-[121px]',
    },
    {
      text: 'Machine Type',
      key: 'machinetype',
      className: 'w-[127px]',
    },
  ];

  const userOptions = ['Logout'];

  const logoutBtn = () => {
    toast.success('Logged out');

    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };

  return (
    <div className="flex items-center justify-between pb-6 ">
      <div className="flex justify-between items-center [&>*:nth-child(4)]:border-0 [&>*:nth-child(1)]:pl-0 [&>*:nth-child(4)]:pr-0">
        {options.map((option) => (
          <div key={option?.key} className="flex border-r-2 px-[52px] border-black">
            <Dropdown
              type="secondary"
              placeholder={option?.text}
              className={`border-none`}
              inputClassName={`placeholder:text-[#444444]  ${option.className}`}
              options={[]}
            />
          </div>
        ))}
      </div>
      <div className="header-search">
        <Input
          placeholder="Search"
          leftIcon={<SearchIcon className="w-[20px] mr-[10px]" />}
          className="px-[20px] py-[10px] w-[230px] border border-solid border-[#444]"
        />
      </div>
      <div className="flex items-center gap-[10px] w-[138px]">
        <div className="bg-[#492CE1] text-white p-3 text-center w-[40px] h-[40px] rounded-[30px] flex items-center justify-center">
          <span className="text-center w-[40px]">{user?.name ? user?.name.charAt(0) : 'U'}</span>
        </div>
        <Dropdown
          type="secondary"
          placeholder="User type"
          value={user?.name}
          className="border-none"
          inputClassName="placeholder:text-[#444444] placeholder:font-medium w-[50px] text-ellipsis overflow-hidden whitespace-nowrap"
          options={userOptions}
          handleChange={logoutBtn}
        />
      </div>
    </div>
  );
};

export default Header;

import { SearchIcon } from '@/assets/icons';
import { Dropdown, Input } from '@/components';

const Header = () => {
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

  return (
    <div className="flex items-center justify-between">
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
      <div>
        <Input
          placeholder="Search"
          leftIcon={<SearchIcon className="w-[20px] mr-[10px]" />}
          className="px-[20px] py-[10px] w-[230px] border border-solid border-[#444] "
        />
      </div>
      <div className="flex items-center gap-[10px]">
        <div className="bg-[#492CE1] text-white p-3 text-center w-[40px] h-[40px] rounded-[30px] flex items-center justify-center">
          <span className="text-center">U</span>
        </div>
        <Dropdown
          type="secondary"
          placeholder="User"
          className="border-none"
          inputClassName=" placeholder:text-[#444444] placeholder:font-medium w-[47px]"
          options={[]}
        />
      </div>
    </div>
  );
};

export default Header;

import { LOGIN_CONSTANTS } from '@/utils/constants';

export const LoginLeftContent = () => {
  return (
    <div className="flex-col flex justify-start items-center h-3/5 w-[56%] ">
      <div className="text-white">
        <h1 className="text-[56px] font-GothamBold font-bold pb-3">{LOGIN_CONSTANTS.title}</h1>
        <div className="border w-[144px] h-[6px] placeholder bg-white opacity-40"></div>
        <div className="pt-4">
          <span className="tracking-[4px] font-normal font-Gotham">{LOGIN_CONSTANTS.description}</span>
        </div>
      </div>
    </div>
  );
};

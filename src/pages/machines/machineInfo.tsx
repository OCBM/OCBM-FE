import { RunningIcon } from '@/assets/icons';
import HONOR_VTC_15 from '../../assets/images/HONOR_VTC_15.png';
import HONOR_VTC_15_Mini from '../../assets/images/HONOR_VTC_15_Mini.png';
import { Button } from '@/components';

const MachineInfo = () => {
  return (
    <div className="flex">
      <div className="flex flex-col border border-solid border-[(rgba(68, 68, 68, 0.40))] shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] pl-6 pr-10 pt-[35px]">
        <div className="flex flex-col items-center justify-center p-5 border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.06)]">
          <p className="text-[#444] text-2xl font-bold tracking-[0.48px] leading-6">HONOR VTC - 15</p>
          <div className="flex items-center gap-[6px] mt-5">
            <RunningIcon />
            <p className="text-[14px] text-[#444] font-medium leading-[10px] tracking-[0.28px]">Running</p>
          </div>
          <div className="mt-5 mb-[18px]">
            <img src={HONOR_VTC_15_Mini} alt="honor-15-mini" />
          </div>
          <Button label="View Details" className="px-5 py-[10px] rounded-2xl" />
        </div>
        <div className="flex flex-col my-[50px] gap-5 overflow-auto ">
          <div className="py-5 px-10 border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] mr-3">
            Hydraulic System
          </div>
          <div className="py-5 px-10 border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] mr-3">
            Spindle Oil Cooling System
          </div>
          <div className="py-5 px-10 border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] mr-3">
            Coolant System
          </div>
          <div className="py-5 px-10 border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] mr-3">
            Lubrication Unit System
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[53px] items-center border border-solid border-[(rgba(68, 68, 68, 0.40))] shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] px-[128px] grow">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#444] text-2xl font-bold tracking-[0.48px] leading-6 pt-10">HONOR VTC 15</p>
          <p className="text-[#444] text-[14px] font-normal tracking-[0.28px] leading-[14px] ">4h 18M 23S</p>
        </div>
        <div className="mb-[50px]">
          <img src={HONOR_VTC_15} alt="honor_15" />
        </div>
      </div>
    </div>
  );
};

export default MachineInfo;

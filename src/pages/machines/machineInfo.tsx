import { RunningIcon } from '@/assets/icons';
import { Button } from '@/components';
import { useParams } from 'react-router-dom';
import { MACHINES_DATA } from '../../utils/machinedata';

const MachineInfo = () => {
  const { id } = useParams();
  const filterMachineById = MACHINES_DATA.find((machine) => machine.id === id);
  return (
    <div className="flex">
      <div className="flex flex-col border border-solid border-[(rgba(68, 68, 68, 0.40))] shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] pl-6 pr-10 pt-[35px] rounded-l-2xl">
        <div className="flex flex-col items-center justify-center p-5 border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.06)]">
          <p className="text-[#444] text-2xl font-bold tracking-[0.48px] leading-6">{filterMachineById?.machine}</p>
          <div className="flex items-center gap-[6px] mt-5">
            <RunningIcon />
            <p className="text-[14px] text-[#444] font-medium leading-[10px] tracking-[0.28px]">Running</p>
          </div>
          <div className="mt-5 mb-[18px]">
            <img src={filterMachineById?.image} alt="honor-15-mini" />
          </div>
          <Button label="View Details" className="px-5 py-[10px] rounded-2xl" />
        </div>
        <div className="flex flex-col my-[50px] gap-5 overflow-auto ">
          {filterMachineById?.subsystems.map((subsystem, index) => (
            <button
              key={index}
              className="py-4 px-10 text-base font-bold font-GothamMedium text-[#444444] text-center border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] mr-3"
            >
              {subsystem.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[53px] items-center border border-solid border-[(rgba(68, 68, 68, 0.40))] shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] grow rounded-r-2xl">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#444] text-2xl font-bold tracking-[0.48px] leading-6 pt-10">
            {filterMachineById?.machine}
          </p>
          <p className="text-[#444] text-[14px] font-normal tracking-[0.28px] leading-[14px] ">4h 18M 23S</p>
        </div>
        <div>
          <img src={filterMachineById?.largeimg} alt="honor_15" />
        </div>
      </div>
    </div>
  );
};

export default MachineInfo;

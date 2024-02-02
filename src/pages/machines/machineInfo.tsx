import { RunningIcon } from '@/assets/icons';
import { Button } from '@/components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MACHINE_SERVICES } from '@/services/machineServices';
import { ELEMENT_SERVICES } from '@/services/elementServices';

const MachineInfo = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [machineList, setMachineList] = useState([]);
  const [machineElementList, setMachineElementList] = useState([]);

  useEffect(() => {
    fetchAllMachines(1);
    fetchElementsByMachineId(state);
  }, []);

  const fetchElementsByMachineId = async (id: any) => {
    const res = await ELEMENT_SERVICES.getElementsByMachineId(id);
    setMachineElementList(res?.message);
  };

  const fetchAllMachines = async (page: number) => {
    const res = await MACHINE_SERVICES.getAllMachines(page);
    setMachineList(res?.message);
  };
  const filterMachineById: any = machineList.find((machine: any) => machine?.machineId === id);
  return (
    <div className="flex">
      <div className="flex flex-col border border-solid border-[(rgba(68, 68, 68, 0.40))] shadow-inner pl-11 pr-11 pt-[35px] rounded-l-2xl">
        <div className="flex flex-col items-center justify-center p-5 border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] rounded-2xl shadow-inner">
          <p className="text-[#444444] text-2xl font-bold tracking-[0.48px] leading-6">
            {filterMachineById?.machineName}
          </p>
          <div className="flex items-center gap-[6px] mt-5">
            <RunningIcon />
            <p className="text-[14px] text-[#444] font-medium leading-[10px] tracking-[0.28px]">Running</p>
          </div>
          <div className="mt-5 mb-[18px]">
            <img src={filterMachineById?.image} alt="honor-15-mini" className="w-36" />
          </div>
          <Button disabled label="View Details" className="px-5 py-[10px] rounded-2xl" />
        </div>
        <div className="flex flex-col my-[50px] overflow-x-hidden h-[325px] webkit-scrollbar-w-5px ">
          {machineElementList?.map((element: any) => (
            <button
              key={element.elementId}
              className="w-full py-4 px-10 text-lg font-bold tracking-[0.32px] text-[#444444] text-center border-2 border-solid border-[(rgba(68, 68, 68, 0.40))] mr-3"
              onClick={() => navigate('/machines/' + id + '/' + element?.elementId)}
            >
              {element.elementName}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[53px] items-center border border-solid border-[(rgba(68, 68, 68, 0.40))] shadow-inner grow rounded-r-2xl">
        <p className="text-[#444] text-2xl font-bold tracking-[0.48px] leading-6 pt-10">
          {filterMachineById?.machineName}
        </p>
        <div className="w-full h-full flex justify-center">
          <img src={filterMachineById?.image} alt="honor_15" className="max-h-[350px]" />
        </div>
      </div>
    </div>
  );
};

export default MachineInfo;

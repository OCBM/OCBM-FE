import MachineCard from '@/components/reusable/card/machineCard';
import { MACHINE_SERVICES } from '@/services/machineServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface machineDataTypes {
  machineName: string;
  image: string;
  machineId: any;
}

const MachinesPage = () => {
  const navigate = useNavigate();
  const [machineList, setMachineList] = useState([]);

  useEffect(() => {
    fetchAllMachines(1);
  }, []);
  const fetchAllMachines = async (page: number) => {
    const res = await MACHINE_SERVICES.getAllMachines(page);
    setMachineList(res?.message);
  };
  return (
    <div className="flex gap-6 flex-wrap">
      {machineList?.map((machineData: machineDataTypes) => (
        <MachineCard
          machineName=""
          sensorCard={false}
          key={machineData?.machineName}
          handleView={() => navigate(`/machines/${machineData.machineId}`, { state: machineData.machineId })}
          title={machineData?.machineName}
          showValues
          showSignals
          outOfSpecValue="03"
          thresholdValue="02"
          withinSpecValue="01"
          image={machineData?.image}
        />
      ))}
    </div>
  );
};

export default MachinesPage;

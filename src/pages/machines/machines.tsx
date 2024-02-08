import MachineCard from '@/components/reusable/card/machineCard';
import { useAppSelector } from '@/hooks';
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
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);

  useEffect(() => {
    currentPlant && fetchAllMachines(1);
  }, [currentPlant]);
  const fetchAllMachines = async (page: number) => {
    if (currentPlant) {
      const res = await MACHINE_SERVICES.getAllMachinesByPlantId(currentPlant, page);
      setMachineList(res?.message);
    }
  };

  return (
    <>
      {!currentPlant ? (
        <div className="text-grey-light text-center font-semibold text-2xl leading-6">No Machines Available</div>
      ) : (
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
      )}
    </>
  );
};

export default MachinesPage;

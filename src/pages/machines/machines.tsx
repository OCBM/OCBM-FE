import MachineCard from '@/components/reusable/card/machineCard';
import { MACHINES_DATA } from '@/utils/machinedata';
import { useNavigate } from 'react-router-dom';
const MachinesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 flex-wrap">
      {MACHINES_DATA.map((machineData) => (
        <MachineCard
          key={machineData.machine}
          handleView={() => navigate(`/machines/${machineData.id}`)}
          title={machineData.machine}
          showValues
          showSignals
          outOfSpecValue="03"
          thresholdValue="02"
          withinSpecValue="01"
          image={machineData.image}
        />
      ))}
    </div>
  );
};

export default MachinesPage;

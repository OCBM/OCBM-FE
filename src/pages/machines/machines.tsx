import MachineCard from '@/components/reusable/card/machineCard';
import HMC1000 from '../../assets/images/HMC1000.jpg';
import SL45 from '../../assets/images/SL45.jpg';
const machines = [
  { title: 'HMC1000', image: HMC1000 },
  { title: 'SL45', image: SL45 },
];
const MachinesPage = () => {
  return (
    <div className="flex gap-6 flex-wrap">
      {machines.map((machineData) => (
        <MachineCard
          key={machineData.title}
          handleView={() => ''}
          title={machineData.title}
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

import MachineCard from '@/components/reusable/card/machineCard';
import { ALL_SENSOR_DATA } from '@/utils/machinedata';
import { useNavigate } from 'react-router-dom';

const SensorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-14 flex-wrap">
      {ALL_SENSOR_DATA.map((sensorData) => (
        <MachineCard
          key={sensorData.title}
          handleView={() => navigate(sensorData.link)}
          title={sensorData.title}
          showValues={false}
          showSignals={false}
          outOfSpecValue="03"
          thresholdValue="02"
          withinSpecValue="01"
          image={sensorData.image}
          disabled={true}
        />
      ))}
    </div>
  );
};

export default SensorPage;

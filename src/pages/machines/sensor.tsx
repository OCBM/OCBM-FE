/* eslint-disable react/jsx-key */
import MachineCard from '@/components/reusable/card/machineCard';
import { ALL_SENSOR_DATA } from '@/utils/machinedata';

const SensorPage = () => {
  return (
    <div className="flex gap-14 flex-wrap">
      {ALL_SENSOR_DATA.map((sensorData) => (
        <MachineCard
          key={sensorData.title}
          handleView={() => ''}
          title={sensorData.title}
          showValues={false}
          showSignals={false}
          outOfSpecValue="03"
          thresholdValue="02"
          withinSpecValue="01"
          image={sensorData.image}
        />
      ))}
    </div>
  );
};

export default SensorPage;

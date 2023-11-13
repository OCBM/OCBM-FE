/* eslint-disable react/jsx-key */
import MachineCard from '@/components/reusable/card/machineCard';
import sensor1 from '../../assets/images/sensor1.png';
import sensor2 from '../../assets/images/sensor2.png';
import sensor3 from '../../assets/images/sensor3.png';
import sensor4 from '../../assets/images/sensor4.png';
const sensors = [
  { title: 'Hydraulic Oil temprature', image: sensor1 },
  { title: 'Hydraulic pump pressure', image: sensor2 },
  { title: 'Hydraulic oil level', image: sensor3 },
  { title: 'Spindle oil level', image: sensor4 },
  { title: 'Spindle oil outlet temprature', image: sensor1 },
  { title: 'Spindle oil pump pressure', image: sensor2 },
  { title: 'Coolant oil pump pressure', image: sensor3 },
  { title: 'Oil level in lube tank', image: sensor4 },
  { title: 'Lube oil pump pressure', image: sensor1 },
  { title: 'Hydraulic oil pump pressure', image: sensor2 },
  { title: 'Hydraulic Oil temprature', image: sensor3 },
  { title: 'Hydraulic pump pressure', image: sensor4 },
  { title: 'Hydraulic oil level', image: sensor1 },
];

const SensorPage = () => {
  return (
    <div className="flex gap-14 flex-wrap">
      {sensors.map((sensorData) => (
        <MachineCard
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

import MachineCard from '@/components/reusable/card/machineCard';
import { useAppSelector } from '@/hooks';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SensorPage = () => {
  const navigate = useNavigate();
  const [ocbmSensorList, setOcbmSensorList] = useState<any>([]);
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);

  const fetchAllSensorss = async (page: number) => {
    if (currentPlant) {
      const res = await SENSOR_SERVICES.getAllSensorOcbmByPlantID(currentPlant, page);
      setOcbmSensorList(res?.message);
    }
  };

  useEffect(() => {
    fetchAllSensorss(1);
  }, [currentPlant]);
  return (
    <div className="flex gap-14 flex-wrap">
      {ocbmSensorList?.map((sensorData: any) => (
        <MachineCard
          machineName={sensorData.sensorId}
          sensorCard={true}
          key={sensorData.title}
          handleView={() => navigate(`/sensor/${sensorData?.sensorId}`, { state: { sensor: sensorData } })}
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

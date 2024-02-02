import MachineCard from '@/components/reusable/card/machineCard';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SensorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ocbmSensorList, setOcbmSensorList] = useState<any>([]);
  const [paginationData, setPaginationData] = useState<any>({});

  const fetchAllSensorsOcbm = async (page: number) => {
    setLoading(true);
    const res = await SENSOR_SERVICES.getAllSensorOcbm(page);
    setOcbmSensorList(res?.message);
    setLoading(false);
    setPaginationData(res?.meta);
    if (res?.Error && paginationData?.current_page > 1) {
      fetchAllSensorsOcbm(paginationData?.current_page - 1);
    }
  };

  useEffect(() => {
    fetchAllSensorsOcbm(1);
  }, []);
  return (
    <div className="flex gap-14 flex-wrap">
      {loading ? (
        <LoadingOutlined />
      ) : (
        ocbmSensorList?.map((sensorData: any) => (
          <MachineCard
            machineName={sensorData?.sensorId}
            sensorCard={true}
            key={sensorData?.title}
            handleView={() => navigate(`/sensor/${sensorData?.sensorId}`, { state: { sensor: sensorData } })}
            title={sensorData?.title}
            showValues={false}
            showSignals={false}
            outOfSpecValue="03"
            thresholdValue="02"
            withinSpecValue="01"
            image={sensorData?.image}
          />
        ))
      )}
    </div>
  );
};

export default SensorPage;

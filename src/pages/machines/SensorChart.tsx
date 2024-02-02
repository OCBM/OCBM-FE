import React, { useEffect, useState } from 'react';
import Charts from './Charts';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { Card } from '@/components';
import { useParams } from 'react-router-dom';

const SensorChart: React.FC = () => {
  const [sensorData, setSensorData] = useState<any>([]);
  const { id } = useParams();

  const fetchSensorData = async () => {
    const res = await SENSOR_SERVICES?.getSensorsBySensorId(id as string);
    setSensorData(res?.message);
  };

  useEffect(() => {
    fetchSensorData();
  }, [id]);

  return (
    <div id="chart">
      <Card tag="high" className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
        <Charts item={sensorData} />
      </Card>
    </div>
  );
};

export default SensorChart;

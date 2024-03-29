import React, { useEffect, useState } from 'react';
import Charts from './Charts';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { Card } from '@/components';
import { useParams } from 'react-router-dom';
import { OperatingRange, SquareIcon, ThresholdValue } from '@/assets/icons';

type CriticalityStatusType = 'normal' | 'medium' | 'high' | '';

const SensorChart: React.FC = () => {
  const [sensorData, setSensorData] = useState<any>([]);
  const [chartCriticalityStatus, setChartCriticalityStatus] = useState<{
    tempStatus: CriticalityStatusType;
    humidityStatus: CriticalityStatusType;
  }>({ tempStatus: '', humidityStatus: '' });
  const { id } = useParams();

  const fetchSensorData = async () => {
    const res = await SENSOR_SERVICES?.getSensorsBySensorId(id as string);
    setSensorData(res?.message);
  };

  useEffect(() => {
    fetchSensorData();
  }, [id]);

  const getTagStatus = () => {
    if (chartCriticalityStatus?.tempStatus === 'high' || chartCriticalityStatus?.humidityStatus === 'high') {
      return 'high';
    } else if (chartCriticalityStatus?.tempStatus === 'medium' || chartCriticalityStatus?.humidityStatus === 'medium') {
      return 'medium';
    } else {
      return 'normal';
    }
  };
  return (
    <div id="chart">
      <div className="w-full flex justify-end">
        <div className="w-[360px] flex gap-[10px] items-center flex-wrap h-fit justify-center">
          <SquareIcon critical active className="w-[16px]" />
          <p className="text-[14px] text-[#444444]">Out of spec</p>
          <SquareIcon medium active className="w-[16px]" />
          <p className="text-[14px] text-[#444444]">Threshold limit</p>
          <SquareIcon low active className="w-[16px]" />
          <p className="text-[14px] text-[#444444]">Within Spec</p>
          <OperatingRange className="w-[30px] h-[2px]" />
          <p className="text-[14px] text-[#444444]">Operating Range</p>
          <ThresholdValue className="w-[30px] h-[2px]" />
          <p className="text-[14px] text-[#444444]">Threshold Value</p>
        </div>
      </div>
      <Card tag={getTagStatus()} className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
        <Charts
          item={sensorData}
          statusCallback={(status: any) =>
            setChartCriticalityStatus({
              tempStatus: status?.tempStatus,
              humidityStatus: status?.humidityStatus,
            })
          }
        />
      </Card>
    </div>
  );
};

export default SensorChart;

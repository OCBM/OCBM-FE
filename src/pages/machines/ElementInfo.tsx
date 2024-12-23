import Charts from './Charts';
import BackIcon from '../../assets/images/back.png';
import { OperatingRange, ReportIcon, SquareIcon, ThresholdValue } from '@/assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ELEMENT_SERVICES } from '@/services/elementServices';
import { useEffect, useState } from 'react';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { Card } from '@/components';
import { MACHINE_SERVICES } from '@/services/machineServices';

type CriticalityStatusType = 'normal' | 'medium' | 'high' | '';

function ElementInfo() {
  const navigate = useNavigate();
  const { machineId, id } = useParams();
  const [elementData, setElementData] = useState<any>();
  const [sensorData, setSensorData] = useState<any>([]);
  const [machineData, setMachineData] = useState<any>();
  const [chartCriticalityStatus, setChartCriticalityStatus] = useState<{
    tempStatus: CriticalityStatusType;
    humidityStatus: CriticalityStatusType;
  }>({ tempStatus: '', humidityStatus: '' });

  const fetchElement = async () => {
    const res = await ELEMENT_SERVICES.getElementByMachineIdAndElementId(id as string, machineId as string);
    setElementData(res);
  };
  const fetchMachineDetail = async () => {
    const res = await MACHINE_SERVICES.getAllMachinesByMachineId(machineId as string);
    setMachineData({ ...res?.message?.[0], machineName: res?.message?.[0]?.machine });
  };

  const fetchSensors = async () => {
    const res = await SENSOR_SERVICES.getSensorsByElementId(id as string);
    setSensorData(res?.message);
  };

  useEffect(() => {
    fetchElement();
    fetchSensors();
    fetchMachineDetail();
  }, [id, machineId]);

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
    <div className="shadow-[0px_4px_20px_0px_#0000000F] border-[1px] border-[#44444440] rounded-[16px] p-[24px] ">
      <div className="flex justify-between mb-8 items-center">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="flex gap-[10px] justify-start items-center cursor-pointer"
        >
          <img className="" src={BackIcon} alt="Back Icon" />
          <p className="text-[#444444] text-[14px]">Back</p>
        </div>
        <div className="flex gap-[10px] justify-start items-center">
          <img className="h-11" src={elementData?.image} alt="Spindle" />
          <h2 className="font-bold text-[24px]">{elementData?.elementName}</h2>
          <ReportIcon className="w-[24px]" />
        </div>
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
      <div className="flex gap-2 flex-wrap ">
        {sensorData?.map((sensor: any) => (
          <div key={sensor.sensor_Id} className="w-full mb-10">
            <Card tag={getTagStatus()} className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
              <Charts
                item={{ elements: { machines: machineData, ...elementData }, ...sensor }}
                statusCallback={(status: any) =>
                  setChartCriticalityStatus({
                    tempStatus: status?.tempStatus,
                    humidityStatus: status?.humidityStatus,
                  })
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ElementInfo;

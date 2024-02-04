import { Card } from '@/components';
import Charts from './Charts';
import Spindle from '../../assets/images/spindle.png';
import BackIcon from '../../assets/images/back.png';
import { OperatingRange, ReportIcon, SquareIcon, ThresholdValue } from '@/assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ELEMENT_SERVICES } from '@/services/elementServices';
import { useEffect, useState } from 'react';
import { SENSOR_SERVICES } from '@/services/sensorServices';

function ElementInfo() {
  const navigate = useNavigate();
  const { machineId, id } = useParams();
  const [elementData, setElementData] = useState<any>();
  const [sensorData, setSensorData] = useState<any>([]);

  const fetchElement = async () => {
    const res = await ELEMENT_SERVICES.getElementByMachineIdAndElementId(id as string, machineId as string);
    setElementData(res);
  };

  const fetchSensors = async () => {
    const res = await SENSOR_SERVICES.getSensorsByElementId(id as string);
    setSensorData(res?.message);
  };

  useEffect(() => {
    fetchElement();
    fetchSensors();
  }, [id, machineId]);

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
          <img className="" src={Spindle} alt="Spindle" />
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
          <div key={sensor.sensor_Id} className="w-[48%]">
            <Card tag="high" className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
              <Charts item={sensor} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ElementInfo;

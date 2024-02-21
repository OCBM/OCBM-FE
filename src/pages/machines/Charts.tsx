import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from 'chart.js';
import SocketTest from './socketTest';

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale);

const Charts = ({ item, statusCallback }: { item: any; statusCallback?: any }) => {
  return (
    <div className="w-full h-auto">
      <div className="flex justify-between w-full gap-4">
        <div className="w-auto">
          <h1 className="uppercase text-[#444444] text-[18px] font-medium mb-2">{item?.sensorLabel}</h1>
        </div>
      </div>
      <div>
        <SocketTest sensorId={item?.sensorId} statusCallback={statusCallback} />
      </div>
    </div>
  );
};

export default Charts;

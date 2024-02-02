import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from 'chart.js';
import { SquareIcon } from '@/assets/icons';
import SocketTest from './socketTest';

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale);

const Charts = ({ item }: any) => {
  return (
    <div className="w-full h-auto">
      <div className="flex justify-between w-full gap-4">
        <div className="w-auto">
          <h1 className="uppercase text-[#444444] text-[18px] font-medium mb-5">{item?.sensorId}</h1>
          <h1 className="uppercase text-[#444444] text-[18px] font-medium mb-5">{item?.sensorDescription}</h1>
        </div>
        <div className="flex flex-col items-end gap-[3px]">
          <SquareIcon active critical className="w-[20px]" />
          <SquareIcon medium className="w-[20px]" />
          <SquareIcon low className="w-[20px]" />
        </div>
      </div>
      <div>
        <SocketTest sensorId={item?.sensorId} />
      </div>
    </div>
  );
};

export default Charts;

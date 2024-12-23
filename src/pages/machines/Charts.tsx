import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from 'chart.js';
import SocketTest from './socketTest';
import { RightOutlined } from '@ant-design/icons';

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale);

const Charts = ({ item, statusCallback }: { item: any; statusCallback?: any }) => {
  return (
    <div className="w-full h-auto">
      <div className="flex justify-between w-full gap-4 border-b border-b-gray-200">
        <div className="w-auto">
          <h1 className="uppercase text-[#444444] text-[16px] font-medium mb-2 flex gap-1">
            {item?.elements?.machines?.machineName ? (
              <>
                {item?.elements?.machines?.machineName} <RightOutlined />
              </>
            ) : null}{' '}
            {item?.elements?.elementName ? (
              <>
                {item?.elements?.elementName} <RightOutlined />
              </>
            ) : null}
            {item?.sensorLabel} <RightOutlined />
            {item?.sensorId}
          </h1>
        </div>
      </div>
      <div>
        <SocketTest sensorId={item?.sensorId} statusCallback={statusCallback} />
      </div>
    </div>
  );
};

export default Charts;

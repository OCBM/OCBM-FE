import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from 'chart.js';
// import { Line } from 'react-chartjs-2';
//import LineCharts from './LineCharts';
import { SquareIcon } from '@/assets/icons';
// import SensorChart from './SensorChart';
// import AntdChart from './antdchart';
import SocketTest from './socketTest';
//import socketIoClient from './socket.io-client';
// import { ChartData } from './chart';
// import { graphData } from './MockData';

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale);

const Charts = ({ item }: any) => {
  return (
    <div className="w-full h-auto">
      {/* {graphData.map((item) => ( */}
      <>
        <div className="flex justify-between w-full gap-4">
          <div className="w-auto">
            <h1 className="uppercase text-[#444444] text-[18px] font-medium w-[70%] mb-5">{item.label}</h1>
          </div>
          <div className="flex flex-col items-end gap-[3px]">
            <SquareIcon active critical className="w-[20px]" />
            <SquareIcon medium className="w-[20px]" />
            <SquareIcon low className="w-[20px]" />
          </div>
        </div>
        <div className="">
          {/* <SensorChart /> */}
          {/* <AntdChart /> */}
          {/* <ChartData /> */}
          <SocketTest />
        </div>
      </>
      {/* ))} */}
    </div>
  );
};

export default Charts;

import { Card } from '@/components';
import Charts from './Charts';
import Hydraulic from '../../assets/images/hydraulic.png';
import BackIcon from '../../assets/images/back.png';
import { OperatingRange, ReportIcon, SquareIcon, ThresholdValue } from '@/assets/icons';
//import { graphData } from '../../utils/ChartMockdata';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HydraulicSystem() {
  interface some {
    method: 'GET' | 'POST' | 'PUT';
    redirect: 'follow';
  }
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const getData = () => {
    var requestOptions: some = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://localhost:3030/graphData', requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="shadow-[0px_4px_20px_0px_#0000000F] border-[1px] border-[#44444440] rounded-[16px] p-[24px]">
      <div className="flex justify-between mb-8 items-center">
        <div onClick={() => navigate(-1)} className="flex gap-[10px] justify-start items-center cursor-pointer">
          <img className="" src={BackIcon} alt="Back Icon" />
          <p className="text-[#444444] text-[14px]">Back</p>
        </div>
        <div className="flex gap-[10px] justify-start items-center">
          <img className="" src={Hydraulic} alt="Hydraulic" />
          <h2 className="font-bold text-[24px]">Hydraulic System</h2>
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
      <div className="flex gap-2 flex-wrap">
        {posts.map((item: any, index: number) => (
          <div key={index} className="w-[33%]">
            <Card tag="high" className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
              <Charts item={item} index={index} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HydraulicSystem;

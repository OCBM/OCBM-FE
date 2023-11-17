import { Card } from '@/components';
import Charts from './Charts';
import Spindle from '../../assets/images/spindle.png';
import BackIcon from '../../assets/images/back.png';
import { OperatingRange, ReportIcon, SquareIcon, ThresholdValue } from '@/assets/icons';
import { graphData } from './MockData';

function LubricationSystem() {
  return (
    <div className="shadow-[0px_4px_20px_0px_#0000000F] border-[1px] border-[#44444440] rounded-[16px] p-[24px] h-full">
      <div className="flex justify-between mb-8 items-center">
        <div className="flex gap-[10px] justify-start items-center">
          <img className="" src={BackIcon} alt="Back Icon" />
          <p className="text-[#444444] text-[14px]">Back</p>
        </div>
        <div className="flex gap-[10px] justify-start items-center">
          <img className="" src={Spindle} alt="Lubrication" />
          <h2 className="font-bold text-[24px]">Lubrication System</h2>
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
      <div className="flex justify-center gap-[20px] w-[100%] h-auto">
        {graphData.map((item) => (
          <div key={item.id} className="w-[33%]">
            <Card tag="high" className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
              <Charts item={item} />
            </Card>
          </div>
        ))}

        {/* <div className="w-[33%]">
          <Card tag="high" className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
            <Charts
              title="Oil Temperature at 
cooler outlet line"
            />
          </Card>
        </div>
        <div className="w-[33%]">
          <Card tag="high" className="w-full shadow-lg h-full bg-white p-[15px] rounded-[9px]">
            <Charts title="HYDRAULIC PUMP OIL OUTLET PRESSURE" />
          </Card>
        </div> */}
      </div>
    </div>
  );
}
export default LubricationSystem;

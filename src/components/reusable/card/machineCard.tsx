import { OutOfSpec, ThresholdlimitUnselected, WithinSpecUnselected } from '@/assets/icons';
import { Button } from '@/components';
const MachineCard = ({
  showValues,
  showSignals,
  title,
  outOfSpecValue,
  thresholdValue,
  handleView,
  withinSpecValue,
  image,
  disabled,
  machineName,
  sensorCard,
}: {
  showValues: boolean;
  sensorCard: boolean;
  showSignals: boolean;
  outOfSpecValue: string;
  thresholdValue: string;
  withinSpecValue: string;
  machineName: string;
  disabled?: boolean;
  title: string;
  image: any;
  handleView?: () => void;
}) => {
  return (
    <div className="flex flex-col items-center pt-[10px] px-[10px] border-[#19c18f] border rounded-2xl relative w-[284px] justify-between ">
      <div className="flex w-full justify-center relative">
        <div className="flex flex-col">
          {sensorCard ? <span className="text-center text-[#444444] font-medium text-sm">{machineName}</span> : null}
          <div className="text-lg font-bold font-GothamMedium pt-3 flex justify-center text-center">{title}</div>
        </div>
        {showSignals ? (
          <div className="absolute right-4 top-1">
            <OutOfSpec />
            <ThresholdlimitUnselected />
            <WithinSpecUnselected />
          </div>
        ) : null}
      </div>
      <img src={image} alt="machine" className="pt-7"></img>
      {showValues ? (
        <div className="pt-7 flex justify-center gap-5">
          <div className="flex flex-col w-[20%] gap-1">
            <span className="border border-[#E93B3B] rounded-lg p-3 text-base font-bold text-[#E93B3B] items-center flex justify-center">
              {outOfSpecValue}
            </span>
            <span className="text-xs text-center">Out of spec</span>
          </div>
          <div className="flex flex-col w-[20%] gap-1">
            <span className="border border-[#FCB254] rounded-lg p-3 text-base font-bold text-[#FCB254] items-center flex justify-center">
              {thresholdValue}
            </span>
            <span className="text-xs text-center">Threshold limit</span>
          </div>
          <div className="flex flex-col w-[20%] gap-1">
            <span className="border border-[#14A87C] rounded-lg p-3 text-base font-bold text-[#14A87C] items-center flex justify-center">
              {withinSpecValue}
            </span>
            <span className="text-xs text-center">Within spec</span>
          </div>
        </div>
      ) : null}
      <div className="pt-7">
        <Button
          onClick={handleView}
          disabled={disabled}
          label="View"
          className={`${
            !disabled && `bg-gradient-to-r from-[#605BFF] to-[#0A03D9]`
          } text-white text-base font-bold py-4 px-20 w-[282px] rounded-t-none rounded-b-2xl items-center`}
        />
      </div>
    </div>
  );
};

export default MachineCard;

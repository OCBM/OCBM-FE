import { Tick } from '@/assets/icons';
import { CheckboxType } from './types';
import { useState } from 'react';

const Checkbox = ({ label, stroke, variant = 'primary' }: CheckboxType) => {
  const [isRemembered, setIsRemembered] = useState<boolean>(false);

  return (
    <label className="flex items-center gap-2">
      <div
        className={`w-5 h-5 rounded-sm border cursor-pointer  ${
          variant == 'primary'
            ? isRemembered
              ? 'border-[#492CE1] bg-[#492CE1] rounded-lg'
              : 'border-[#492CE1] border-[2px] rounded-lg'
            : ' '
        } 
        ${
          variant == 'secondary'
            ? isRemembered
              ? 'border-[black] border-[2px] bg-transparent cursor-pointer rounded-lg'
              : 'border-[black] border-[2px] rounded-lg'
            : ' '
        }`}
      >
        {isRemembered && (
          <div className="">
            <Tick stroke={stroke} className=" w-5 h-6 pb-[8px]  " />
          </div>
        )}
      </div>
      <span>{label}</span>
      <input
        type="checkbox"
        checked={isRemembered}
        onChange={(e) => setIsRemembered(e.target.checked)}
        className="hidden"
      />
    </label>
  );
};

export default Checkbox;

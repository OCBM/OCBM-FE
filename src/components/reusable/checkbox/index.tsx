import { Tick } from '@/assets/icons';
import { CheckboxType } from './types';
import { useState } from 'react';

const Checkbox = ({ label, stroke, variant = 'primary' }: CheckboxType) => {
  const [isRemembered, setIsRemembered] = useState<boolean>(false);

  return (
    <label className="flex items-center gap-2">
      <div
        className={`w-4 h-4 rounded-sm border cursor-pointer ${
          variant == 'primary'
            ? isRemembered
              ? 'border-[#492CE1] bg-[#492CE1]'
              : 'border-[#492CE1] border-[2px] rounded'
            : ' '
        } 
        ${
          variant == 'secondary'
            ? isRemembered
              ? 'border-[black] bg-[white] cursor-pointer'
              : 'border-[black] border-[1px] rounded'
            : ' '
        }`}
      >
        {isRemembered && (
          <div className="">
            <Tick stroke={stroke} className=" w-4 h-4 pb-[2px]" />
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

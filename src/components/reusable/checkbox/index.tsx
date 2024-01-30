import { Tick } from '@/assets/icons';
import { CheckboxType } from './types';

const Checkbox = ({ label, stroke, variant = 'primary', onChange, checked }: CheckboxType) => {
  return (
    <label className="flex items-center gap-2">
      <div
        className={`w-5 h-5 rounded-sm border cursor-pointer  ${
          variant == 'primary'
            ? checked
              ? 'border-[#492CE1] bg-[#492CE1] rounded-[4px]'
              : 'border-[#492CE1] border-[2px] rounded-[4px]'
            : ' '
        } 
        ${
          variant == 'secondary'
            ? checked
              ? 'border-[black] border-[2px] bg-transparent cursor-pointer rounded-[4px]'
              : 'border-[black] border-[2px] rounded-[4px]'
            : ' '
        }`}
      >
        {checked && (
          <div>
            <Tick stroke={stroke} className=" w-5 h-6 pb-[8px]  " />
          </div>
        )}
      </div>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
    </label>
  );
};

export default Checkbox;

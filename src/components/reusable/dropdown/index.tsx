import { useEffect, useRef, useState } from 'react';
import { DropdownPropsType } from './types';
import { ChevronDownIcon } from '@/assets/icons';

const Dropdown = ({
  options,
  value,
  handleChange = () => {},
  type,
  placeholder,
  className,
  label,
  labelClassName,
  inputClassName,
  optionLabel = '',
  optionValue = '',
}: DropdownPropsType) => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = (option: any) => {
    setQuery('');
    if (optionValue) {
      handleChange(option[optionValue]);
    } else {
      handleChange(option);
    }
    setIsOpen(!isOpen);
  };

  function toggle(event: any) {
    setIsOpen(event && event.target === inputRef.current);
  }

  const getDisplayValue = () => {
    // If we edit the text field that text will be displayed
    if (query) {
      return query;
    }
    // If we dont provide any label and value default input value provided
    else if (!optionLabel && !optionValue) {
      return value;
    } else if (optionLabel && !optionValue) {
      //@ts-ignore
      return value && value[optionLabel];
    } else {
      return value;
    }
  };

  const filterOptions = (options: any) => {
    if (optionLabel) {
      return options?.filter(
        (option: any) => option[optionLabel]?.toString()?.toLowerCase().includes(query.toLowerCase()),
      );
    } else if (!optionLabel && !optionValue) {
      return options?.filter(
        (option: any) => typeof option === 'string' && option?.toLowerCase().includes(query.toLowerCase()),
      );
    }
    return [];
  };

  return (
    <div className="relative">
      {label && (
        <label className={`${labelClassName || ''} text-[#492CE1] text-[14px] font-medium block mb-2`}>{label}</label>
      )}
      <div
        className={
          type === 'secondary'
            ? `flex items-center justify-between border-b-2 ${className}`
            : `flex border-2 overflow-hidden rounded-[50px] gap-3 items-center justify-between border-[#444444] cursor-pointer ${className}`
        }
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || value}
          value={getDisplayValue()}
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange('');
          }}
          onClick={toggle}
          className={`grow h-full cursor-pointer outline-none mr-[10px] ${inputClassName}`}
        />
        <span className={isOpen ? 'rotate-180 transition' : ''}>
          <ChevronDownIcon />
        </span>
      </div>
      {isOpen && (
        <div className="absolute border-4 w-full px-8 py-3 my-3 border-white rounded-b-2xl rounded-l-2xl shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08) z-[99] bg-white">
          {filterOptions(options)?.map((option: any) => {
            if (optionLabel) {
              return (
                <div
                  onClick={() => selectOption(option)}
                  className="p-4  cursor-pointer transition-all  hover:bg-[#f4f4f4] rounded-r-xl"
                  key={option[optionLabel]}
                >
                  {option[optionLabel]}
                </div>
              );
            } else if (typeof option === 'string') {
              return (
                <div
                  onClick={() => selectOption(option)}
                  className="p-4  cursor-pointer transition-all  hover:bg-[#f4f4f4] rounded-r-xl"
                  key={option}
                >
                  {option}
                </div>
              );
            }
            return '';
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

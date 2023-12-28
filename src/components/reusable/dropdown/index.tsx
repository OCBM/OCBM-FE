import { useEffect, useRef, useState } from 'react';
import { DropdownPropsType } from './types';
import { ChevronDownIcon } from '@/assets/icons';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const Dropdown = ({
  options,
  value,
  handleChange = () => {},
  type,
  placeholder,
  className,
  label,
  labelClassName = '',
  inputClassName = '',
  openClassName = '',
  wrapClassName = '',
  optionLabel = '',
  optionValue = '',
  mandatory = false,
  disabled = false,
  editable = false,
}: DropdownPropsType) => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const dropdownClick = useRef(null);

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(dropdownClick, handleClickOutside);

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
    if (
      (event && event.target === inputRef.current) ||
      event.target === iconRef.current ||
      event.target === dropdownClick.current ||
      event.target.parentElement.parentElement.parentElement === iconRef.current
    ) {
      if (isOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
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
    <div
      className={`relative w-full ${wrapClassName || ' '}`}
      onClick={(event) => {
        event.stopPropagation();
        toggle(event);
      }}
    >
      {label && (
        <label className={`${labelClassName || ''} text-[#492CE1] text-[14px] font-medium block mb-2`}>
          {label}
          <span className="text-[#D95117]">{mandatory ? '*' : ''}</span>
        </label>
      )}
      <div
        ref={dropdownClick}
        onClick={() => setIsOpen(!isOpen)}
        className={
          type === 'secondary'
            ? `flex items-center justify-between border-b-2 ${className} cursor-pointer`
            : `flex border-2 overflow-hidden w-2/6 rounded-[50px] gap-3 items-center justify-between border-[#444444] cursor-pointer ${className} cursor-pointer`
        }
      >
        {editable ? (
          <input
            type="text"
            disabled={disabled}
            ref={inputRef}
            placeholder={placeholder || value}
            value={getDisplayValue()}
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange('');
            }}
            className={`grow h-full cursor-pointer outline-none bg-transparent ${inputClassName}`}
          />
        ) : (
          <div
            ref={inputRef}
            className={`grow cursor-pointer outline-none bg-transparent ${
              disabled && 'pointer-events-none'
            } ${inputClassName}  ${placeholder && !getDisplayValue() && 'text-gray-400'}`}
          >
            {getDisplayValue() || placeholder}
          </div>
        )}
        <span ref={iconRef} className={`pl-3 pr-3 mt-1 ${isOpen ? 'rotate-180 transition' : ''}`}>
          <ChevronDownIcon />
        </span>
      </div>
      {isOpen && (
        <div
          className={`absolute border-4 w-full my-3 border-white rounded-b-2xl rounded-2xl top-20 overflow-y-auto max-h-[277px] shadow-lg z-[99] bg-white ${openClassName}`}
        >
          {filterOptions(options)?.map((option: any) => {
            if (optionLabel) {
              return (
                <div
                  onClick={() => selectOption(option)}
                  className="p-4 cursor-pointer transition-all hover:bg-[#f4f4f4] rounded-r-xl"
                  key={option[optionLabel]}
                >
                  {option[optionLabel]}
                </div>
              );
            } else if (typeof option === 'string') {
              return (
                <div
                  onClick={() => selectOption(option)}
                  className="py-4 px-2 cursor-pointer transition-all hover:bg-[#f4f4f4] rounded-r-xl"
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

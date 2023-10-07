// import { useEffect, useRef, useState } from 'react';
// import { DropdownOptionType, DropdownPropsType } from './types';
// import { ChevronDownIcon } from '@/assets/icons';

// const Dropdown = ({
//   options,
//   value,
//   handleChange = () => {},
//   type,
//   placeholder,
//   className,
//   label,
//   labelclassName,
// }: DropdownPropsType) => {
//   const [query, setQuery] = useState<string>('');
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     document.addEventListener('click', toggle);
//     return () => document.removeEventListener('click', toggle);
//   }, []);

//   const selectOption = (option: DropdownOptionType) => {
//     setQuery('');
//     handleChange(option?.text);
//     setIsOpen(!isOpen);
//   };

//   function toggle(event: any) {
//     setIsOpen(event && event.target === inputRef.current);
//   }

//   const getDisplayValue = () => {
//     if (query) return query;
//     if (value) return value;
//     return '';
//   };

//   const filterOptions = (options: DropdownOptionType[]) => {
//     return options?.filter((option: DropdownOptionType) => option?.text?.toLowerCase().includes(query.toLowerCase()));
//   };

//   return (
//     <div className="relative">
//       {label && (
//         <label className={`${labelclassName || ''} text-[#492CE1] text-[14px] font-medium block mb-2`}>{label}</label>
//       )}
//       <div
//         className={
//           type === 'secondary'
//             ? `flex items-center justify-between border-b-2 py-3 px-5 ${className}`
//             : `flex border-2 py-3 px-5 overflow-hidden rounded-[50px] gap-3 items-center justify-between border-[#444444] cursor-pointer ${className}`
//         }
//       >
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder={placeholder || value}
//           value={getDisplayValue()}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             handleChange('');
//           }}
//           onClick={toggle}
//           className="grow h-full cursor-pointer outline-none"
//         />
//         <span className={isOpen ? 'rotate-180 transition' : ''}>
//           <ChevronDownIcon />
//         </span>
//       </div>
//       {isOpen && (
//         <div className="absolute border-4 w-full px-8 py-3 my-3 border-white rounded-b-2xl rounded-l-2xl shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08) z-[99] bg-white">
//           {filterOptions(options).map((option: DropdownOptionType) => (
//             <div
//               onClick={() => selectOption(option)}
//               className="p-4  cursor-pointer transition-all  hover:bg-[#f4f4f4] rounded-r-xl"
//               key={option?.id}
//             >
//               {option?.text}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;

import { useEffect, useRef, useState } from 'react';
import { DropdownOptionType, DropdownPropsType } from './types';
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
}: DropdownPropsType) => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = (option: DropdownOptionType) => {
    setQuery('');
    handleChange(option?.text);
    setIsOpen(!isOpen);
  };

  function toggle(event: any) {
    setIsOpen(event && event.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (value) return value;
    return '';
  };

  const filterOptions = (options: DropdownOptionType[]) => {
    return options?.filter((option: DropdownOptionType) => option?.text?.toLowerCase().includes(query.toLowerCase()));
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
            : `flex border-2 py-3 px-5 overflow-hidden rounded-[50px] gap-3 items-center justify-between border-[#444444] cursor-pointer ${className}`
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
          {filterOptions(options)?.map((option: DropdownOptionType) => (
            <div
              onClick={() => selectOption(option)}
              className="p-4  cursor-pointer transition-all  hover:bg-[#f4f4f4] rounded-r-xl"
              key={option?.id}
            >
              {option?.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

// import { InputType } from './types';

// function Input({
//   id,
//   name,
//   className,
//   type,
//   value,
//   placeholder,
//   onChange,
//   label,
//   leftIcon,
//   rightIcon,
//   labelclassName,
// }: InputType) {
//   return (
//     <div className="relative">
//       {label && (
//         <label className={`${labelclassName || ''} text-[#492CE1] text-[14px] font-medium block mb-2`}>{label}</label>
//       )}
//       <div
//         className={`${
//           className || ''
//         } rounded-[50px] border-gray-400 border-2 border-solid h-[40px] px-3 flex items-center`}
//       >
//         {leftIcon}
//         <input
//           id={id}
//           type={type}
//           name={name}
//           value={value}
//           placeholder={placeholder}
//           onChange={onChange}
//           className="border-none w-full outline-none mx-2"
//         />
//         {rightIcon}
//       </div>
//     </div>
//   );
// }

// export default Input;

import { InputType } from './types';

function Input({
  id,
  name,
  className,
  type,
  value,
  placeholder,
  onChange,
  label,
  leftIcon,
  rightIcon,
  labelClassName,
}: InputType) {
  return (
    <div className="relative">
      {label && (
        <label className={`${labelClassName || ''} text-[#492CE1] text-[14px] font-medium block mb-2`}>{label}</label>
      )}
      <div
        className={`${
          className || ''
        } rounded-[50px] border-gray-400 border-2 border-solid gap-[14px] flex items-center`}
      >
        {leftIcon}
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="border-none w-full outline-none"
        />
        {rightIcon}
      </div>
    </div>
  );
}

export default Input;

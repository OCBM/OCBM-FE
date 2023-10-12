import { InputType } from './types';

function Input({
  id,
  name,
  className = '',
  type = 'text',
  value,
  placeholder = '',
  onChange,
  label,
  leftIcon,
  disabled = false,
  rightIcon,
  labelClassName = '',
  inputClassName = '',
}: InputType) {
  return (
    <div className="relative">
      {label && <label className={labelClassName}>{label}</label>}
      <div className={`${className} rounded-[50px] border-gray-400 border-solid flex items-center`}>
        {leftIcon}
        <input
          id={id}
          type={type}
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`${inputClassName} w-full outline-none mx-1 bg-transparent`}
        />
        {rightIcon}
      </div>
    </div>
  );
}

export default Input;

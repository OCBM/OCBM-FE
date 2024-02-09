import { InputType } from './types';

function Input({
  id,
  name,
  className = '',
  type = 'text',
  value,
  placeholder = '',
  pattern = '[0-9]+',
  onChange,
  label,
  leftIcon,
  disabled = false,
  rightIcon,
  labelClassName = '',
  inputClassName = '',
  mandatory = false,
  parentClassName = '',
}: InputType) {
  return (
    <div className={` relative w-fit ${parentClassName || ''}`}>
      {label && (
        <label className={labelClassName}>
          {label}
          <span className="text-[#D95117]">{mandatory ? '*' : ''}</span>
        </label>
      )}
      <div className={`${className} rounded-[50px] border-gray-400 border-solid flex items-center`}>
        {leftIcon}
        <input
          id={id}
          pattern={pattern}
          type={type}
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`${inputClassName} w-full outline-none mx-1 bg-transparent`}
        />
        <span className="absolute right-3">{rightIcon}</span>
      </div>
    </div>
  );
}

export default Input;

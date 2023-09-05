import { InputType } from './types';

function Input({
	id,
	name,
	className,
	type,
	value,
	placeholder,
	onClick,
	label,
	inputIcon,
}: InputType) {
	return (
		<div className="relative">
			<label className="text-[#492CE1] text-[14px] font-medium block mb-2">{label}</label>
			<input
				id={id}
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onClick={onClick}
				className={`${
					className || ''
				} w-full rounded-[50px] border-gray-400 border-2 border-solid h-[40px]`}
			/>
			{inputIcon}
		</div>
	);
}

export default Input;

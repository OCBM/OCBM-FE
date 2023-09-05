import { ButtonPropType } from './types';

const Button = ({
	className,
	type,
	label,
	leftIcon,
	rightIcon,
	variant,
	onClick,
}: ButtonPropType) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={
				variant === 'secondary'
					? `${className} p-3 rounded-2xl border text-base border-themeColor text-themeColor`
					: `${className} p-3 rounded-2xl border bg-themeColor text-[#ffffff] text-base font-bold ${
							leftIcon ? 'flex items-center gap-16' : ''
					  }`
			}>
			<>
				{leftIcon && leftIcon}
				{label}
				{rightIcon && rightIcon}
			</>
		</button>
	);
};

export default Button;

import { ButtonPropType } from './types';
import classNames from 'classnames';
const Button = ({
	className,
	type,
	label,
	leftIcon,
	rightIcon,
	variant = 'primary',
	disabled,
	onClick,
}: ButtonPropType) => {
	const buttonClasses = classNames(
		'p-3 rounded-2xl border',
		{
			' text-base border-themeColor text-themeColor ': variant === 'secondary',
		},
		{
			'!border-grey-light !text-grey-light cursor-not-allowed ':
				variant === 'secondary' && disabled,
		},
		{ ' text-[#ffffff] text-base font-bold bg-themeColor ': variant === 'primary' },

		{ ' !bg-grey-light cursor-not-allowed ': disabled && variant === 'primary' },

		{ ' flex items-center gap-2 ': leftIcon },
		className
	);
	return (
		<button type={type} onClick={onClick} disabled={disabled} className={buttonClasses}>
			<>
				{leftIcon && leftIcon}
				{label}
				{rightIcon && rightIcon}
			</>
		</button>
	);
};

export default Button;

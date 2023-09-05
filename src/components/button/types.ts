export type ButtonPropType = {
	className: string;
	label?: string;
	variant?: 'primary' | 'secondary' | undefined;
	type?: 'button' | 'submit' | 'reset' | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
};

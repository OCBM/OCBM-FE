export type ButtonPropType = {
	className: string;
	variant?: string;
	label: string;
	secondary?: boolean;
	type?: 'button' | 'submit' | 'reset' | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
};

export type ButtonPropType = {
  className?: string;
  label: string;
  variant?: 'primary' | 'secondary' | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  leftIcon?: JSX.Element | string;
  rightIcon?: JSX.Element | string;
};

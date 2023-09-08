export type ButtonPropType = {
  className?: string;
  label: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  leftIcon?: JSX.Element | string;
  rightIcon?: JSX.Element | string;
};

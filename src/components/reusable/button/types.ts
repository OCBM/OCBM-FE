import { JSX, MouseEventHandler } from 'react';

export type ButtonPropType = {
  className?: string;
  label: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: JSX.Element | string;
  rightIcon?: JSX.Element | string;
};

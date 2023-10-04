import { JSX, ChangeEventHandler } from 'react';

export type InputType = {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  label?: string;
  inputIcon?: JSX.Element;
  labelclassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

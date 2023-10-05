import { JSX } from 'react';

export type InputType = {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: () => void;
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  labelclassName?: string;
};

import { JSX, ChangeEvent } from 'react';

export type InputType = {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent) => void;
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  labelclassName?: string;
};

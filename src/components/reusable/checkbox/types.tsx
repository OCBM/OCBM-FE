import { ChangeEvent } from 'react';

export type CheckboxType = {
  name?: string;
  className?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  variant?: 'primary' | 'secondary';
  stroke?: string;
};

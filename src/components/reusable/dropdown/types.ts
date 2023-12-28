export type DropdownPropsType = {
  options: any;
  value?: any;
  handleChange?: (val: string) => void;
  type?: 'primary' | 'secondary' | undefined;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapClassName?: string;
  openClassName?: string;
  optionLabel?: string;
  optionValue?: string;
  mandatory?: boolean;
  disabled?: boolean;
  editable?: boolean;
};

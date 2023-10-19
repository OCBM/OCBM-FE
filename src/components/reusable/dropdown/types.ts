export type DropdownPropsType = {
  options: any;
  value?: string;
  handleChange?: (val: string) => void;
  type?: 'primary' | 'secondary' | undefined;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  optionLabel?: string;
  optionValue?: string;
  mandatory?: boolean;
  disabled?: boolean;
  editable?: boolean;
};

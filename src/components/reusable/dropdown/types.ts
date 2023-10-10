export type DropdownPropsType = {
  options: any;
  value?: string;
  handleChange?: (val: string) => void;
  type?: 'primary' | 'secondary' | undefined;
  placeholder?: string;
  className?: string;
  label?: string;
  labelclassName?: string;
  optionLabel?: string;
  optionValue?: string;
};

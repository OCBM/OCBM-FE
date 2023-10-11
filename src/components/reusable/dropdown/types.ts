export type DropdownPropsType = {
  options: DropdownOptionType[];
  value?: string;
  handleChange?: (val: string) => void;
  type?: 'primary' | 'secondary' | undefined;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export type DropdownOptionType = {
  id: number;
  text: string;
};

export type DropdownPropsType = {
  options: DropdownOptionType[];
  value?: string;
  handleChange?: (val: string) => void;
  type?: 'primary' | 'secondary' | undefined;
  placeholder?: string;
  className?: string;
  label?: string;
  labelclassName?: string;
};

export type DropdownOptionType = {
  id: number;
  text: string;
};

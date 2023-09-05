export type DropdownPropsType = {
  options: DropdownOptionType[];
  selectedVal?: string;
  handleChange: (val: string) => void;
  type?: 'primary' | 'secondary' | undefined;
  placeholder?: string;
};

export type DropdownOptionType = {
  id: number;
  text: string;
};

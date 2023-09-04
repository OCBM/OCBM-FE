export type DropdownPropsType = {
	options?: { text: string }[];
	selectedVal?: string;
	handleChange: (val: string) => void;
	type?: string;
	placeholder?: string;
};

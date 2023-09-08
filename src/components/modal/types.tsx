export type ModalTypes = {
  isOpen?: boolean;
  onCancel: () => void;
  children?: string | JSX.Element | JSX.Element[];
};

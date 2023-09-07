export type ModalTypes = {
  isOpen?: React.MouseEventHandler<HTMLButtonElement> | boolean;
  modalCloseRequest: () => void;
  children?: string | JSX.Element | JSX.Element[];
};

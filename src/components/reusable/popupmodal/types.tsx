export type PopUpModalTypes = {
  onCloseDeleteModal?: () => void;
  onCloseSuccessModal?: () => void;
  handleDelete?: () => void;
  isOpen?: boolean;
  handleClose?: () => void;
  title?: string;
  primaryPopup?: boolean;
  primaryMessage?: string;
  icon?: any;
};

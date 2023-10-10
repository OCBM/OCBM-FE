import { ModalTypes } from './types';

function Modal({ isOpen, onCancel, children, className }: ModalTypes) {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`${className} absolute bottom-0 top-0 left-0 right-0 flex items-center cursor-default justify-center bg-[#0000006e] p-3 transition-[0.8]`}
      onClick={onCancel}
    >
      <div
        className=" cursor-default rounded-xl bg-white "
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;

import { ModalTypes } from './types';

function Modal({ isOpen, modalCloseRequest, children }: ModalTypes) {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="absolute bottom-0 top-0 left-0 right-0 flex items-center cursor-default justify-center bg-[#0000006e] p-3 transition-[0.8]"
      onClick={modalCloseRequest}
    >
      <div
        className="width-[450px] cursor-default rounded-xl bg-white p-5"
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

import { Button, Modal } from '@/components';
import { PopUpModalTypes } from './types';

const PopupModal = ({
  onCloseDeleteModal,
  onCloseSuccessModal,
  handleDelete,
  handleClose,
  title,
  isOpen,
  primaryPopup,
  icon,
  primaryMessage,
}: PopUpModalTypes) => {
  return (
    <div>
      <Modal isOpen={isOpen} onCancel={handleClose} className="z-[99]">
        <div className="w-[393px] rounded-[16px] py-[50px] px-[86px] relative">
          <div className="flex flex-col items-center justify-center">
            {icon}
            <h2 className="text-[24px] text-center text-[#272332] font-medium mt-2 mb-4">{title}</h2>
            <div className="flex gap-[8px] justify-between">
              {primaryPopup ? (
                <Button
                  label={primaryMessage}
                  variant="primary"
                  className="rounded-[16px] text-[16px] font-medium tex-[#ffffff] italic py-[8px] px-[24px] w-[104px]"
                  onClick={onCloseSuccessModal}
                />
              ) : (
                <>
                  <Button
                    label="Cancel"
                    variant="secondary"
                    className="rounded-[16px] text-[16px] font-medium text-[#605BFF] italic py-[8px] px-[24px] w-[104px]"
                    onClick={onCloseDeleteModal}
                  />
                  <Button
                    label="Yes"
                    variant="primary"
                    className="rounded-[16px] text-[16px] font-medium tex-[#ffffff] italic py-[8px] px-[24px] w-[104px]"
                    onClick={handleDelete}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupModal;

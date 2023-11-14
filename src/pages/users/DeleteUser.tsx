import { QuestionMarkIcon } from '@/assets/icons';
import { Button } from '@/components';
import { DeleteUserType } from './types';
import { USERS_PAGE_CONSTANTS } from './constants';

const DeleteUser = ({ onCloseDeleteModal, deleteUser }: DeleteUserType) => {
  return (
    <div className="w-[393px] rounded-[16px] py-[50px] px-[86px] relative">
      <div className="flex flex-col items-center justify-center">
        <QuestionMarkIcon />
        <h2 className="text-[24px] text-center text-[#272332] font-medium mt-2 mb-4">
          {USERS_PAGE_CONSTANTS.DELETE_USER_DIALOG.message}
        </h2>
        <div className="flex gap-[8px] justify-between">
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
            onClick={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;

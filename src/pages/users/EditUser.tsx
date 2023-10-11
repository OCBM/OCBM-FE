import { ChevronCancelIcon } from '@/assets/icons';
import { Button, Input } from '@/components';
import { EditUserType } from './types';

const EditUser = ({ handleChange, updateUser, onCloseEditModal, edit, selectedUser }: EditUserType) => {
  return (
    <div className="w-[870px] rounded-[16px] p-[50px] relative">
      <div
        className="absolute right-[10px] top-[10px] cursor-pointer"
        onClick={() => {
          onCloseEditModal();
        }}
      >
        <ChevronCancelIcon />
      </div>
      <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-5">Edit Details</h2>
      <form>
        <div className="flex gap-[36px] justify-between">
          <div>
            <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-4">Employee Detail</h4>
            <Input
              className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="Employee Name*"
              placeholder="Enter Full Name"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              type="text"
              value={selectedUser?.name}
              onChange={handleChange}
              name="name"
            />
            <Input
              className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="Employee ID*"
              placeholder="Enter Employee ID"
              disabled={edit}
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              type="text"
              name="employeeid"
              value={selectedUser?.employeeId}
              onChange={handleChange}
            />
            <Input
              className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              placeholder="Select Position"
              label="Position*"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              name="position"
              onChange={handleChange}
              type="text"
              value={selectedUser?.position}
            />
          </div>

          <div>
            <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-4">User Detail</h4>
            <Input
              className="w-[349px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="User Name"
              placeholder="Enter Full Name"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              name="username"
              onChange={handleChange}
              disabled={edit}
              type="text"
              value={selectedUser.userName}
            />

            <Input
              className="w-[349px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="Access Type"
              value={selectedUser.role}
              placeholder="Enter Type"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              onChange={handleChange}
              disabled={edit}
              name="role"
            />

            <Input
              className="w-[349px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="Set New Password"
              placeholder="Enter Password"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <Button
            variant="primary"
            label="Submit"
            onClick={updateUser}
            className="py-[8px] px-[24px] rounded-[16px] font-normal text-[16px]"
          />
        </div>
      </form>
    </div>
  );
};

export default EditUser;

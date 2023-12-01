import { ChevronCancelIcon } from '@/assets/icons';
import { Button, Dropdown, Input } from '@/components';
import { EditUserType, UserGroupTypes, UserOrganizationTypes, UserPlantTypes, UserTypes } from './types';
import { USERS_PAGE_CONSTANTS } from './constants';

const EditUser = ({
  handleChange,
  updateUser,
  onCloseEditModal,
  edit,
  selectedUser,
  setSelectedUser,
}: EditUserType) => {
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
      <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-5">
        {USERS_PAGE_CONSTANTS.EDIT_USER_DIALOG.label}
      </h2>
      <form>
        <div className="flex gap-[36px] justify-between h-[485px] overflow-y-auto disable-scrollbar">
          <div>
            <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-4">
              {USERS_PAGE_CONSTANTS.EDIT_USER_DIALOG.leftLabel}
            </h4>
            <Input
              className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="Employee Name"
              placeholder="Enter Full Name"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              type="text"
              value={selectedUser?.name}
              onChange={handleChange}
              name="name"
              mandatory={true}
            />
            <Input
              className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="Employee ID"
              placeholder="Enter Employee ID"
              disabled={edit}
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              type="text"
              name="employeeid"
              value={selectedUser?.employeeId}
              onChange={handleChange}
              mandatory={true}
            />
            <Input
              className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              placeholder="Select Position"
              label="Position"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              name="position"
              onChange={handleChange}
              type="text"
              value={selectedUser?.position}
              mandatory={true}
            />

            <Dropdown
              className="w-[385px] h-[54px] rounded-[50px] border-gray-400 border-[1px] p-[15px] mb-5 mt-2"
              placeholder="Organization"
              label="Organization"
              optionLabel="organizationName"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              options={selectedUser.organization}
              value={selectedUser.organizationValue}
              mandatory={true}
              handleChange={(value) => {
                setSelectedUser((prev: UserTypes) => ({
                  ...prev,
                  organization: [value as unknown as UserOrganizationTypes],
                }));
              }}
            />

            <Dropdown
              className="w-[385px] h-[54px] rounded-[50px] border-gray-400 border-[1px] p-[15px] mb-5 mt-2"
              placeholder="Group"
              label="Group"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              options={selectedUser.groups}
              optionLabel="groupName"
              value={selectedUser.groupValue}
              mandatory={true}
              handleChange={(value) => {
                setSelectedUser((prev: UserTypes) => ({ ...prev, groups: [value as unknown as UserGroupTypes] }));
              }}
            />
          </div>

          <div>
            <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-4">
              {USERS_PAGE_CONSTANTS.EDIT_USER_DIALOG.rightLabel}
            </h4>
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

            <Dropdown
              className="w-[349px] h-[54px] rounded-[50px] border-gray-400 border-[1px] p-[15px] mb-5 mt-2"
              label="Access Type"
              value={selectedUser.role}
              options={USERS_PAGE_CONSTANTS.ROLE_ACCESS_TYPES}
              handleChange={(value) => {
                setSelectedUser((prev: any) => ({ ...prev, role: value }));
              }}
              optionLabel="role"
              optionValue="role"
              placeholder="Enter Type"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
            />
            <Input
              className="w-[349px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
              label="Set New Password"
              value={selectedUser.password}
              name="password"
              type="password"
              placeholder="Enter Password"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              onChange={handleChange}
            />
            <Dropdown
              className="w-[349px] h-[54px] rounded-[50px] border-gray-400 border-[1px] p-[15px] mb-5 mt-2"
              placeholder="Plant"
              label="Plant"
              labelClassName="text-[#492CE1] text-[14px] font-medium"
              optionLabel="plantName"
              options={selectedUser.plants}
              handleChange={(value) => {
                setSelectedUser((prev: UserTypes) => ({ ...prev, plants: [value as unknown as UserPlantTypes] }));
              }}
              value={selectedUser.plantValue}
              mandatory={true}
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

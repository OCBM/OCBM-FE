import { useState, useEffect } from 'react';
import { ChevronCancelIcon, DeleteIcon, PencilIcon } from '@/assets/icons';
import { Button, Input, Modal } from '@/components';
import { Table } from '@/components/reusable/table';
import { USER_SERVICES } from '@/services/userServices';
import { USER_ROLES } from '@/utils/constants';
import { toast } from 'react-toastify';

function UsersList() {
  type UserInterface = {
    name: string | null;
    position: string | null;
    employeeid: string | null;
  };

  const initialState = {
    userId: '',
    userName: '',
    employeeId: '',
    name: '',
    position: '',
    role: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    groups: [],
    organization: [],
  };
  const [userdata, setUserdate] = useState([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState(initialState);
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await USER_SERVICES.getUserbyRole(USER_ROLES.ADMIN);
      setUserdate(res.message);
      console.log('response', res);
    })();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedUser((initialState: any) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const Edituser = (data: UserInterface) => {
    setEdit(true);
    if (data) {
      setShowEditUserModal(true);
      setSelectedUser(data);
    }
  };

  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <div className="cursor-pointer" onClick={() => Edituser(data)}>
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                console.log('Delete icon clicked');
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  const editUserModalCloseHandler = () => {
    setSelectedUser(initialState);
    setShowEditUserModal(false);
  };

  const updateUser = async () => {
    const res = await USER_SERVICES.updateUserbyId(selectedUser.userId, selectedUser);
    if (res.statusCode === 200) {
      setShowEditUserModal(false);
      toast.success('Changes are Done');
    }
  };
  return (
    <div>
      <Modal
        isOpen={showEditUserModal}
        onCancel={() => {
          editUserModalCloseHandler();
        }}
        className="z-[99]"
      >
        <div className="w-[870px] rounded-[16px] p-[50px] relative">
          <div
            className="absolute right-[10px] top-[10px] cursor-pointer"
            onClick={() => {
              editUserModalCloseHandler();
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
                  label="Reset Password"
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
      </Modal>

      <Table className="mt-5 w-[80%] mx-auto" dataSource={userdata} columns={columns} />
    </div>
  );
}

export default UsersList;

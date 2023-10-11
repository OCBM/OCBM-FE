import { useState, useEffect } from 'react';
import { DeleteIcon, PencilIcon } from '@/assets/icons';
import { Modal } from '@/components';
import { Table } from '@/components/reusable/table';
import { USER_SERVICES } from '@/services/userServices';
import { USER_ROLES } from '@/utils/constants';
import { toast } from 'react-toastify';
import EditUser from './EditUser';
import { SelectedUserTypes } from './types';

function UsersList() {
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
  const [selectedUser, setSelectedUser] = useState<SelectedUserTypes>(initialState);
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);

  // fetching users data by role
  const fetchUserDataByRole = async () => {
    const res = await USER_SERVICES.getUserbyRole(USER_ROLES.ADMIN);
    setUserdate(res?.message);
  };

  useEffect(() => {
    fetchUserDataByRole();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedUser((initialState: SelectedUserTypes) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const Edituser = (data: SelectedUserTypes) => {
    setEdit(true);
    if (data) {
      setShowEditUserModal(true);
      setSelectedUser(data);
    }
  };
  const DeleteUser = async (data: SelectedUserTypes) => {
    if (data) {
      const res = await USER_SERVICES.deleteUserById(data.userId);
      toast.success(res.message);
      fetchUserDataByRole();
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
                DeleteUser(data);
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  const onCloseEditModal = () => {
    setSelectedUser(initialState);
    setShowEditUserModal(false);
  };

  const updateUser = async () => {
    const res = await USER_SERVICES.updateUserbyId(selectedUser.userId, selectedUser);
    if (res.statusCode === 200) {
      fetchUserDataByRole();
      setTimeout(() => {
        setShowEditUserModal(false);
        toast.success('User updated successfully');
      }, 1000);
    }
  };
  return (
    <div>
      <Modal isOpen={showEditUserModal} onCancel={onCloseEditModal} className="z-[99]">
        <EditUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          edit={edit}
          handleChange={handleChange}
          onCloseEditModal={onCloseEditModal}
          updateUser={updateUser}
        />
      </Modal>

      <Table className="mt-5 w-[80%] mx-auto" dataSource={userdata} columns={columns} />
    </div>
  );
}

export { UsersList };

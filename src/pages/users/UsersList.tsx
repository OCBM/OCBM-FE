import { useState, useEffect } from 'react';
import { PlusIcon, DeleteIcon, PencilIcon } from '@/assets/icons';
import { Button, Modal } from '@/components';
import { Table } from '@/components/reusable/table';
import { USER_SERVICES } from '@/services/userServices';
import { toast } from 'react-toastify';
import EditUser from './EditUser';
import { UserTypes } from './types';
import DeleteUser from './DeleteUser';
import { useAppSelector } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { SITEMAP } from '@/utils/sitemap';

function UsersList() {
  const initialState = {
    userId: '',
    userName: '',
    employeeId: '',
    name: '',
    position: '',
    role: '',
    email: '',
    groups: [],
    organization: [],
    password: '',
  };
  const [userdata, setUserdate] = useState([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserTypes>(initialState);
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
  const loggedUser = useAppSelector((state) => state.auth?.user);

  // fetching users data by role
  const fetchUserDataByRole = async () => {
    if (loggedUser) {
      //error needs to correct
      //@ts-ignore
      const res = await USER_SERVICES.getUserbyRole(loggedUser?.role);
      setUserdate(res?.message);
    }
  };
  const OnAddUserPage = () => {
    navigate(SITEMAP.users.addUser);
  };

  useEffect(() => {
    fetchUserDataByRole();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedUser((initialState: UserTypes) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const Edituser = (data: UserTypes) => {
    setEdit(true);
    if (data) {
      setShowEditUserModal(true);
      setSelectedUser(data);
    }
  };
  const onDeleteUser = async (id: string) => {
    setShowDeleteUserModal(true);
    if (id) {
      const res = await USER_SERVICES.deleteUserById(id);
      toast.success(res.message);
      fetchUserDataByRole();
      setShowDeleteUserModal(false);
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
                setSelectedUser(data);
                setShowDeleteUserModal(true);
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
    const body = {
      name: selectedUser.name,
      position: selectedUser.position,
      password: selectedUser.password,
    };
    const res = await USER_SERVICES.updateUserbyId(selectedUser.userId, body);
    if (res.statusCode === 200) {
      fetchUserDataByRole();
      setTimeout(() => {
        setShowEditUserModal(false);
        toast.success('User updated successfully');
      }, 1000);
    }
  };

  const navigate = useNavigate();

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
      <Modal
        isOpen={showDeleteUserModal}
        onCancel={() => {
          setShowDeleteUserModal(false);
        }}
        className="z-[99]"
      >
        <DeleteUser
          deleteUser={() => {
            onDeleteUser(selectedUser.userId);
          }}
          onCloseDeleteModal={() => {
            setShowDeleteUserModal(false);
          }}
        />
      </Modal>
      <div className="absolute top-[11%] right-[4%]">
        <Button
          leftIcon={<PlusIcon />}
          label="Create"
          className="py-[8px] px-[18px] text-[16px] font-medium"
          variant="primary"
          onClick={OnAddUserPage}
        />
      </div>
      <Table className="w-full mx-auto" dataSource={userdata} columns={columns} />
    </div>
  );
}

export { UsersList };

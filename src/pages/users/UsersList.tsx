import { useState, useEffect } from 'react';
import { DeleteIcon, PencilIcon, ChevronSuccessIcon, QuestionMarkIcon } from '@/assets/icons';
import { Modal } from '@/components';
import { Table } from '@/components/reusable/table';
import { USER_SERVICES } from '@/services/userServices';
import { toast } from 'react-toastify';
import EditUser from './EditUser';
import { UserTypes } from './types';
import { useAppSelector } from '@/hooks';
import classNames from 'classnames';
import { USER_ROLES } from '@/utils/constants';
import Loader from '@/components/reusable/loader';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';

// changes

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
    plants: [],
    password: '',
  };
  const [userData, setUserData] = useState([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserTypes>(initialState);
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAppSelector((state) => state.auth.user);
  // const [page, setpage] = useState<{
  //   pageNumber: number;
  //   pageSize: number;
  // }>({
  //   pageNumber: 1,
  //   pageSize: 10,
  // });
  const loggedUser = useAppSelector((state) => state.auth?.user);

  // fetching users data by role
  const fetchUserDataByRole = async (page: number, limit: number) => {
    if (loggedUser) {
      setIsLoading(true);
      const res = await USER_SERVICES.getAllUsers(page, limit);
      setUserData(res?.message);
      setIsLoading(false);
    } else {
      console.error('user is not logged in');
    }
  };

  useEffect(() => {
    fetchUserDataByRole(1, 1000);
    // fetchUserDataByRole(page?.pageNumber, page?.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedUser((initialState: UserTypes) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const editUser = async (data: UserTypes) => {
    setEdit(true);
    if (data.userId) {
      const res = await USER_SERVICES.getUserById(data.userId);
      setShowEditUserModal(true);
      const plantValue = res.message.plants[0];
      const organizationValue = res.message.organization[0];
      const groupValue = res.message.groups[0];
      const userData = {
        ...res?.message,
        plantValue,
        organizationValue,
        groupValue,
      };
      setSelectedUser(userData);
    }
  };
  const onDeleteUser = async (id: string) => {
    setShowDeleteUserModal(true);
    if (id) {
      const res = await USER_SERVICES.deleteUserById(id);
      toast.success(res.message);
      fetchUserDataByRole(1, 1000);
      // fetchUserDataByRole(page?.pageNumber, page?.pageSize);
      setShowDeleteUserModal(false);
    }
  };

  const isAdmin = () => {
    return auth?.role === USER_ROLES.ADMIN;
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <div
              className={classNames('cursor-pointer', {
                ' opacity-50 pointer-events-none ': !isAdmin(),
              })}
              onClick={() => editUser(data)}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className={classNames('cursor-pointer', {
                ' opacity-50 pointer-events-none ': !isAdmin(),
              })}
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
    type bodyType = {
      name: string;
      position: string;
      role: string;
      password?: string;
      groups: Object;
      organization: Object;
      plants: Object;
    };
    const body: bodyType = {
      name: selectedUser.name,
      position: selectedUser.position,
      role: selectedUser.role,
      groups: {
        connect: [
          {
            groupId: (selectedUser.groups.length && selectedUser.groups[0]?.groupId) || '',
          },
        ],
      },
      organization: {
        connect: [
          {
            organizationId: (selectedUser.organization.length && selectedUser.organization[0]?.organizationId) || '',
          },
        ],
      },
      plants: {
        connect: [
          {
            plantId: (selectedUser.plants.length && selectedUser.plants[0]?.plantId) || '',
          },
        ],
      },
    };
    if (selectedUser.password) {
      body.password = selectedUser.password;
    }

    // const body = {
    //   name: selectedUser.name,
    //   position: selectedUser.position,
    //   password: selectedUser.password,
    // };
    const res = await USER_SERVICES.updateUserbyId(selectedUser.userId, body);
    if (res.statusCode === 200) {
      fetchUserDataByRole(1, 1000);
      // fetchUserDataByRole(page?.pageNumber, page?.pageSize);
      setShowEditUserModal(false);
      setShowEditSuccessModal(true);
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
      {/*Delete message modal*/}
      <PopupModal
        title={'Are you sure want to delete?'}
        isOpen={showDeleteUserModal}
        icon={<QuestionMarkIcon />}
        handleClose={() => setShowDeleteUserModal(false)}
        handleDelete={() => {
          onDeleteUser(selectedUser.userId);
        }}
        onCloseDeleteModal={() => {
          setShowDeleteUserModal(false);
        }}
      />
      {/*Success message modal*/}
      <PopupModal
        primaryMessage={'Done'}
        title={'Changes are done'}
        isOpen={showEditSuccessModal}
        icon={<ChevronSuccessIcon className="w-[100px] h-[100px]" />}
        primaryPopup
        handleClose={() => onCloseEditModal}
        onCloseSuccessModal={() => setShowEditSuccessModal(false)}
      />
      <Table
        className="w-full mx-auto"
        dataSource={userData}
        columns={columns}
        loading={{
          indicator: <Loader />,
          spinning: isLoading,
        }}
      />
    </div>
  );
}

export { UsersList };

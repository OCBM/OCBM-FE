import { useBreadcrumbs } from '@/hooks';
import { useState } from 'react';
import { Breadcrumbs, Button, Dropdown, Input } from '@/components';
import { addUser } from '@/services/userServices';
import { useNavigate } from 'react-router-dom';
const Position = [
  {
    id: 1,
    text: 'employee',
  },
  {
    id: 2,
    text: 'manager',
  },
];

const Organization = [
  {
    id: 1,
    text: 'Organization 1',
  },
  {
    id: 2,
    text: 'Organization 2',
  },
];

const Plant = [
  {
    id: 1,
    text: 'plant 1',
  },
  {
    id: 2,
    text: 'plant 2',
  },
];

const userType = [
  {
    id: 1,
    text: 'SUPERADMIN',
  },
  {
    id: 2,
    text: 'ADMIN',
  },
  {
    id: 3,
    text: 'USER',
  },
];

function Addusers() {
  const list = useBreadcrumbs();

  type InitialStateType = {
    name: string;
    employeeid: string;
    email: string;
    position: string | null;
    organization: string | null;
    plants: string | null;
    username: string;
    password: string;
    role: string | null;
  };
  const initialState = {
    name: '',
    employeeid: '',
    email: '',
    position: null,
    organization: null,
    plants: null,
    username: '',
    password: '',
    role: null,
  };
  const [user, setUser] = useState<InitialStateType>(initialState);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser((initialState: InitialStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const disableAdUser = () => {
    return user.role &&
      user.employeeid &&
      user.name &&
      user.email &&
      user.password &&
      user.plants &&
      user.position &&
      user.username
      ? false
      : true;
  };

  async function createUser() {
    const body = {
      ...user,
      groups: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    };
    await addUser(body);
  }

  const navigate = useNavigate();

  return (
    <>
      <Breadcrumbs crumbs={['home', ...list]} />
      <div className="shadow-md w-full p-[20px] mt-[30px] rounded-[16px]">
        <h2 className="uppercase text-[24px] text-[#444444] font-medium">Add User</h2>
        <form>
          <div className="flex justify-start flex-row w-full gap-[20px] mt-5 ml-5 mb-9">
            <Input
              className="p-6 rounded-[50px] border-[1px] border-grey-dark w-[348px]"
              label="Employee Name*"
              placeholder="Enter Full Name"
              type="text"
              name="name"
              value={user?.name}
              onChange={handleChange}
            />
            <Input
              className="p-6 rounded-[50px] border-[1px] border-grey-dark w-[348px]"
              label="Employee Id*"
              placeholder="Enter Employee Id"
              type="text"
              name="employeeid"
              value={user?.employeeid}
              onChange={handleChange}
            />

            <Dropdown
              label="Position*"
              className="w-[348px] border-[1px]"
              placeholder="Select Position"
              options={Position}
              handleChange={(value) => {
                setUser((prev: any) => ({ ...prev, position: value }));
              }}
              value={user?.position}
            />
          </div>

          <div className="flex justify-start flex-row w-full gap-[20px] mt-5 ml-5 mb-9">
            <Dropdown
              label="Select Organization*"
              className="w-[348px] border-[1px]"
              placeholder="Select Organization"
              options={Organization}
              handleChange={(value) => {
                setUser((prev: any) => ({ ...prev, organization: value }));
              }}
              value={user?.organization}
            />

            <Dropdown
              label="Select plant*"
              className="w-[348px] border-[1px]"
              placeholder="Select plant"
              value={user?.plants}
              options={Plant}
              handleChange={(value) => {
                setUser((prev: any) => ({ ...prev, plants: value }));
              }}
            />
            <Input
              className="p-6 rounded-[50px] border-[1px] border-grey-dark w-[348px]"
              label="Email*"
              placeholder="Enter Employee Id"
              type="email"
              name="email"
              value={user?.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-start flex-row w-full gap-[20px] mt-5 ml-5 mb-9">
            <Input
              className="p-6 rounded-[50px] border-[1px] border-grey-dark w-[348px]"
              label="User Name*"
              placeholder="Enter Full Name"
              type="text"
              name="username"
              value={user?.username}
              onChange={handleChange}
            />
            <Input
              className="p-6 rounded-[50px] border-[1px] border-grey-dark w-[348px]"
              label="Password*"
              placeholder="Enter Password"
              type="password"
              name="password"
              value={user?.password}
              onChange={handleChange}
            />

            <Dropdown
              handleChange={(value) => {
                setUser((prev: any) => ({ ...prev, role: value }));
              }}
              label="Access Type*"
              className="w-[348px] border-[1px]"
              value={user?.role}
              placeholder="Select Type"
              options={userType}
            />
          </div>

          <div className="flex justify-start flex-row w-full gap-[20px] mt-5 ml-5 mb-9">
            <Button
              onClick={() => {
                navigate('/userdetails');
              }}
              className="py-2 px-6 rounded-[16px]"
              label="Cancel"
              variant="secondary"
            />
            <Button
              className="py-2 px-6 rounded-[16px]"
              label="Create"
              onClick={createUser}
              disabled={disableAdUser()}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Addusers;

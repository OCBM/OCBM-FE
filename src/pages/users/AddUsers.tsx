import { useState, useEffect } from 'react';
import { Button, Dropdown, Input } from '@/components';
import { useNavigate } from 'react-router-dom';
import { USER_SERVICES } from '@/services/userServices';
import { GROUP_SERVICES } from '@/services/groupServices';
import { ORGANIZATION_SERVICES } from '@/services/organizationServices';
import { toast } from 'react-toastify';
import { SITEMAP } from '@/utils/sitemap';
import { USERS_PAGE_CONSTANTS } from './constants';
import { PLANT_SERVICES } from '@/services/plantServices';

function Addusers() {
  type InitialStateType = {
    name: string | undefined;
    employeeId: string | undefined;
    email: string | undefined;
    position: string | undefined;
    organization: string | any;
    plants: string | any;
    groups: string | any;
    userName: string | undefined;
    password: string | undefined;
    role: string | undefined;
  };
  const initialState = {
    name: '',
    employeeId: '',
    email: '',
    position: '',
    organization: '',
    plants: '',
    groups: '',
    userName: '',
    password: '',
    role: '',
  };

  const [user, setUser] = useState<InitialStateType>(initialState);
  const [organizationData, setOrganizationData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [plantsData, setPlantsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrganizations() {
      const organization = await ORGANIZATION_SERVICES.getAllOrganization();
      setOrganizationData(organization.message);
    }

    async function getGroups() {
      const group = await GROUP_SERVICES.getAllGroups();
      setGroupsData(group.message);
    }
    getOrganizations();
    getGroups();
  }, []);

  async function getPlants(value: any) {
    const plants = await PLANT_SERVICES.getAllPlantsByOrgId(value.organizationId);
    setPlantsData(plants?.message);
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser((initialState: InitialStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };
  const disablingAddUser = () => {
    return user.role &&
      user.employeeId &&
      user.name &&
      user.email &&
      user.password &&
      user.position &&
      user.userName &&
      user.groups &&
      user.plants
      ? false
      : true;
  };

  async function createUser() {
    const body = {
      userName: user.userName,
      name: user.name,
      email: user.email,
      employeeId: user.employeeId,
      position: user.position,
      role: user.role,
      groups: {
        connect: [
          {
            groupId: user.groups?.groupId || '',
          },
        ],
      },
      plants: {
        connect: [
          {
            plantId: user.plants?.plantId || '',
          },
        ],
      },
      organization: {
        connect: [
          {
            organizationId: user.organization?.organizationId || '',
          },
        ],
      },
      password: user.password,
    };
    const res = await USER_SERVICES.addUser(body);
    if (res?.statusCode === 201) {
      setUser(initialState);
      toast.success('User added successfully');
      navigate(SITEMAP.users.index);
    }
  }
  return (
    <>
      <div className="shadow-md w-full p-[20px] rounded-[16px] mx-auto mb-8 overflow-x-hidden">
        <h2 className="text-[24px] text-[#444444] font-medium">Add user</h2>
        <form>
          <div className="w-[95%] mx-auto">
            <div className="flex justify-between flex-row w-full gap-[20px] mt-5  mb-9">
              <Input
                parentClassName=" !w-full "
                className="rounded-[50px] border-[1px] border-grey-dark w-full h-[50px] mt-2 px-3"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                label="Employee Name"
                placeholder="Enter Full Name"
                type="text"
                name="name"
                value={user?.name}
                onChange={handleChange}
                mandatory={true}
              />
              <Input
                className="rounded-[50px] border-[1px] border-grey-dark !w-full h-[50px] mt-2 px-3"
                parentClassName=" !w-full "
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                label="Employee Id"
                placeholder="Enter Employee Id"
                type="text"
                name="employeeId"
                value={user?.employeeId}
                onChange={handleChange}
                mandatory={true}
              />

              <Input
                parentClassName=" !w-full "
                className="rounded-[50px] border-[1px] border-grey-dark w-full h-[50px] mt-2 px-3"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                label="Position"
                placeholder="Enter Position"
                type="text"
                name="position"
                value={user?.position}
                onChange={handleChange}
                mandatory={true}
              />
            </div>

            <div className="flex justify-between flex-row w-full gap-[20px] mt-5 mb-9">
              <Dropdown
                label="Select Organization"
                className="w-full border-[1px] h-[50px] px-3"
                placeholder="Select Organization"
                options={organizationData}
                handleChange={(value) => {
                  setUser((prev: any) => ({ ...prev, organization: value }));
                  getPlants(value);
                }}
                value={user.organization}
                optionLabel="organizationName"
                mandatory={true}
              />

              <Dropdown
                label="Select Group"
                className="w-full border-[1px] h-[50px] px-3"
                placeholder="Select Group"
                value={user?.groups}
                options={groupsData}
                optionLabel="groupName"
                handleChange={(value) => {
                  setUser((prev: any) => ({ ...prev, groups: value }));
                }}
                mandatory={true}
              />

              <Dropdown
                label="Select Plant"
                className="w-full border-[1px] h-[50px] px-3"
                placeholder="Select Plant"
                value={user?.plants}
                options={plantsData}
                disabled={!user.organization}
                optionLabel="plantName"
                handleChange={(value) => {
                  setUser((prev: any) => ({ ...prev, plants: value }));
                }}
                mandatory={true}
              />
            </div>

            <div className="flex justify-between flex-row w-full gap-[20px] mt-5 mb-9">
              <Input
                className="rounded-[50px] border-[1px] border-grey-dark w-full h-[50px] mt-2 px-3"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                label="User Name"
                placeholder="Enter Full Name"
                type="text"
                parentClassName=" !w-full "
                name="userName"
                value={user?.userName}
                onChange={handleChange}
                mandatory={true}
              />

              <Input
                parentClassName=" !w-full "
                className="rounded-[50px] border-[1px] border-grey-dark w-full h-[50px] mt-2 px-3"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                label="Email"
                placeholder="Enter your Email"
                type="text"
                name="email"
                value={user?.email}
                onChange={handleChange}
                mandatory={true}
              />
              <Input
                className="rounded-[50px] border-[1px] border-grey-dark w-full h-[50px] mt-2 px-3"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                parentClassName=" !w-full "
                label="Password"
                placeholder="Enter Password"
                type="password"
                name="password"
                value={user?.password}
                onChange={handleChange}
                mandatory={true}
              />
            </div>
            <div className="flex justify-start flex-row gap-[20px] mt-5 mb-9">
              <div className="w-[33%]">
                <Dropdown
                  label="Role"
                  className="w-[100%] border-[1px] h-[50px] px-3"
                  placeholder="Select Role"
                  value={user?.role}
                  options={USERS_PAGE_CONSTANTS.ROLE_ACCESS_TYPES}
                  optionLabel="role"
                  optionValue="role"
                  handleChange={(value) => {
                    setUser((prev: any) => ({ ...prev, role: value }));
                  }}
                  mandatory={true}
                />
              </div>
            </div>

            <div className="flex justify-start flex-row w-full gap-[20px] mt-5 mb-9">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                className="py-2 px-6 rounded-[16px]"
                label="Cancel"
                variant="secondary"
              />
              <Button
                className="py-2 px-6 rounded-[16px]"
                label="Create"
                onClick={createUser}
                disabled={disablingAddUser()}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addusers;

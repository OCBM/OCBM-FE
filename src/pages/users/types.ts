import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type UserGroupTypes = {
  groupId: string;
  groupName: string;
  permissions: string[];
  role: string;
};
export type UserOrganizationTypes = {
  organizationId: string;
  organizationName: string;
};

export type UserPlantTypes = {
  plantId: string;
  plantName: string;
  description: string;
  organizationId: string;
  image: string;
};

export type UserTypes = {
  userId: string;
  userName: string;
  employeeId: string;
  name: string;
  position: string;
  role: string;
  email: string;
  groups: UserGroupTypes[];
  plants: UserPlantTypes[];
  plantValue?: UserPlantTypes | any;
  groupValue?: UserGroupTypes | any;
  organizationValue?: UserOrganizationTypes | any;
  organization: UserOrganizationTypes[];
  password: string;
};

export type EditUserType = {
  handleChange: (event: ChangeEvent<HTMLInputElement> | UserPlantTypes) => void;
  updateUser: () => void;
  onCloseEditModal: () => void;
  edit: boolean;
  selectedUser: UserTypes;
  setSelectedUser: Dispatch<SetStateAction<UserTypes>>;
};

export type DeleteUserType = {
  onCloseDeleteModal: () => void;
  deleteUser: () => void;
};

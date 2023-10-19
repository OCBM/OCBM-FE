import { ChangeEvent } from 'react';

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
  organization: UserOrganizationTypes[];
  password: string;
};

export type EditUserType = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  updateUser: () => void;
  onCloseEditModal: () => void;
  edit: boolean;
  selectedUser: UserTypes;
  setSelectedUser: (state: UserTypes) => void;
};

export type DeleteUserType = {
  onCloseDeleteModal: () => void;
  deleteUser: () => void;
};

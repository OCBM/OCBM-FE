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

export type SelectedUserTypes = {
  userId: string;
  userName: string;
  employeeId: string;
  name: string;
  position: string;
  role: string;
  email: string;
  groups: UserGroupTypes[];
  organization: UserOrganizationTypes[];
};

export type EditUserType = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  updateUser: () => void;
  onCloseEditModal: () => void;
  edit: boolean;
  selectedUser: SelectedUserTypes;
  setSelectedUser: (state: SelectedUserTypes) => void;
};

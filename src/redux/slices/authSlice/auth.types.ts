export interface LoggedInUserType {
  userId: string;
  userName: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'SUPERADMIN';
  accessToken: string;
  groups: UserGroupsType[];
}

interface UserGroupsType {
  groupId: string;
  groupName: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}
interface Organization {
  createdAt: string;
  organizationId: string;
  organizationName: string;
  updatedAt: string;
}

export interface AuthInitialState {
  loggedIn: boolean;
  isLoading: boolean;
  user: LoggedInUserType | null;
  organization: Organization | null;
}
export interface LoginDataType {
  userName: string;
  password: string;
}

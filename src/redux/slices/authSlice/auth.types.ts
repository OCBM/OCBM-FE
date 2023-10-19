export interface LoggedInUserType {
  userId: string;
  userName: string;
  name: string;
  email: string;
  role: string;
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

export interface AuthInitialState {
  loggedIn: boolean;
  isLoading: boolean;
  user: LoggedInUserType | null;
}
export interface LoginDataType {
  userName: string;
  password: string;
}

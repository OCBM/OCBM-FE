import { accessRules } from '@/utils/accessibilityConstants';
import { JSX } from 'react';

type AccessManagerProps = {
  role: 'ADMIN' | 'SUPERADMIN' | 'USER';
  category: 'Plant' | 'Machines' | 'Reports' | 'Mastery' | 'Set Standards' | 'User';
  children: string | JSX.Element | JSX.Element[];
  accessNeeded: 'read' | 'update' | 'delete' | 'add';
};

const AccessManager = ({ role, category, children, accessNeeded }: AccessManagerProps) => {
  const userAccess = accessRules[role]?.[category]?.includes(accessNeeded);

  return userAccess ? <>{children}</> : null;
};

export default AccessManager;

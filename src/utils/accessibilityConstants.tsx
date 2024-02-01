export const accessRules: any = {
  USER: {
    plant: ['read'],
    machines: ['read'],
    reports: ['read'],
    mastery: [],
    setStandards: ['read'],
    user: [],
  },
  SUPER_ADMIN: {
    plant: ['read'],
    machines: ['read', 'update', 'delete', 'add'],
    reports: ['read', 'update', 'delete', 'add'],
    mastery: ['read', 'update', 'delete', 'add'],
    setStandards: ['read', 'update', 'delete', 'add'],
    user: ['read', 'update', 'delete', 'add'],
  },
  ADMIN: {
    plant: ['read', 'update', 'delete', 'add'],
    machines: ['read', 'update', 'delete', 'add'],
    reports: ['read', 'update', 'delete', 'add'],
    mastery: ['read', 'update', 'delete', 'add'],
    setStandards: ['read', 'update', 'delete', 'add'],
    user: ['read', 'update', 'delete', 'add'],
  },
};

export const accessRules: any = {
  USER: {
    Plant: ['read'],
    Machines: ['read'],
    Reports: ['read'],
    Mastery: [],
    'Set Standards': ['read'],
    User: [],
  },
  ADMIN: {
    Plant: ['read'],
    Machines: ['read', 'update', 'delete', 'add'],
    Reports: ['read', 'update', 'delete', 'add'],
    Mastery: ['read', 'update', 'delete', 'add'],
    'Set Standards': ['read', 'update', 'delete', 'add'],
    User: ['read', 'update', 'delete', 'add'],
  },
  SUPERADMIN: {
    Plant: ['read', 'update', 'delete', 'add'],
    Machines: ['read', 'update', 'delete', 'add'],
    Reports: ['read', 'update', 'delete', 'add'],
    Mastery: ['read', 'update', 'delete', 'add'],
    'Set Standards': ['read', 'update', 'delete', 'add'],
    User: ['read', 'update', 'delete', 'add'],
  },
};

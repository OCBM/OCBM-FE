export const SITEMAP = {
  base: {
    index: '/',
  },
  auth: {
    index: '/auth/login',
  },
  plant: {
    index: '/plant',
  },
  machines: {
    index: '/machines',
    machinesbyId: '/machines/:id',
    hydraulicSystem: '/machines/:id/hydraulicSystem',
    SpindleCoolingSystem: '/machines/:id/SpindleCoolingSystem',
    LubricationSystem: '/machines/:id/LubricationSystem',
  },
  mastery: {
    index: '/mastery',
  },
  setStandards: {
    index: '/setStandards',
  },
  reports: {
    index: '/reports',
  },
  users: {
    index: '/userDetails',
    addUser: '/userDetails/addUser',
  },
  notFound: '*',
};

export const SERVICES = {
  auth: {
    login: '/auth/login',
  },
  user: {
    add: '/user',
    get: '/user',
    update: '/user',
    delete: '/user',
  },
  organization: {
    get: '/organization',
  },
  plants: {
    get: '/plant',
    add: '/plant',
    delete: '/plant',
    update: '/plant',
  },
  machineLine: {
    get: '/machineline',
    add: '/machineline',
    update: '/machineline',
    delete: '/machineline',
  },
  shops: {
    get: '/shop',
    add: '/shop',
    update: '/shop',
    delete: 'shop',
  },
  machines: {
    get: '/machine',
    add: '/machine',
    update: '/machine',
    delete: '/machine',
  },
  groups: {
    get: '/group',
  },
};
